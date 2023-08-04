import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
	post: IPost;
}
interface Like {
	likeId: string;
	userId: string;
}
export const Post = (props: Props) => {
	const [user] = useAuthState(auth);
	const { post } = props;

	const [likes, setLikes] = useState<Like[] | null>(null);

	const likesRef = collection(db, "likes");

	const likesDocQuery = query(likesRef, where("postId", "==", post.id));

	const getLikes = async () => {
		const likesDocs = await getDocs(likesDocQuery);
		//console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		//setLikeAmount(data.docs.length);
		setLikes(
			likesDocs.docs.map((doc) => ({
				userId: doc.data().userId,
				likeId: doc.id,
			}))
		);
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
	useEffect(() => {
		getLikes();
	}, []);
	const addLike = async () => {
		try {
			const newDoc = await addDoc(likesRef, {
				userId: user?.uid,
				postId: post?.id,
			});
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user.uid, likeId: newDoc.id }]
						: [{ userId: user.uid, likeId: newDoc.id }]
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likesRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			);
			const likeToDeleteData = await getDocs(likeToDeleteQuery);
			const likeToDeleteDocId = likeToDeleteData.docs[0].id;
			const likeToDeleteDoc = doc(db, "likes", likeToDeleteDocId);
			await deleteDoc(likeToDeleteDoc);
			if (user) {
				setLikes(
					(prev) =>
						prev && prev.filter((like) => like.likeId !== likeToDeleteDocId)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className='title'>
				<h1>{post.title}</h1>
			</div>
			<div className='body'>
				<p>{post.description}</p>
			</div>
			<div className='footer'>
				<p>@{post.username}</p>
				<span>
					{hasUserLiked ? (
						<button onClick={removeLike}> &#128078;</button>
					) : (
						<button onClick={addLike}> &#128077; </button>
					)}
					{likes?.length !== undefined && likes?.length > 0 && (
						<p>Likes :{likes?.length}</p>
					)}
				</span>
			</div>
		</div>
	);
};
