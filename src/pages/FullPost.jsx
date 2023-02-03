import React from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);
  React.useEffect(() => {
    if (Array.isArray(data?.comments)) {
      setComments(data.comments);
    }
  }, [data]);
  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl && `${process.env.REACT_APP_API_URL}${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown>{data.text}</ReactMarkdown>
      </Post>
      <CommentsBlock items={comments} isLoading={isLoading}>
        <Index setComments={setComments} id={id} comments={comments} />
      </CommentsBlock>
    </>
  );
};
