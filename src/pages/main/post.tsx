import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
	post: IPost;
}
interface Like {
	userId: string;
}
export const Post = (props: Props) => {
	const [user] = useAuthState(auth);
	const { post } = props;

	const [likes, setLikes] = useState<Like[] | null>(null);

	const likesRef = collection(db, "likes");

	const likesDoc = query(likesRef, where("postId", "==", post.id));

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		//console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		//setLikeAmount(data.docs.length);
		setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
	useEffect(() => {
		getLikes();
	}, []);
	const addLike = async () => {
		await addDoc(likesRef, {
			userId: user?.uid,
			postId: post?.id,
		});
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
						<button> &#128078;</button>
					) : (
						<button onClick={addLike}> &#128077; </button>
					)}
					{likes?.length && (
						<p
						//style={{ display: "inline" }}
						>
							Likes :{likes?.length}
						</p>
					)}
				</span>
			</div>
		</div>
	);
};
