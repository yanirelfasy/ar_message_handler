import './App.css';
import {useEffect, useState} from 'react';
import {getMessageDetails, getUserDetails} from './FirebaseHandler';


function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState({});



  useEffect(() => {

    const getPostDetails = async () => {
      setIsLoading(true);

      // let messageDetails = await getMessageDetails("8e6ba7a4-8463-40e3-bfbb-b85cbfd64020");
      let messageDetails = await getMessageDetails(getURLParam("markerID"));
      let userDetails = await getUserDetails(messageDetails.userID);
      setPostData(prev => {return {
        userID: userDetails.userID,
        messageID: messageDetails.id,
        profilePicture: userDetails.profilePicture,
        likes: messageDetails.likeID.length,
        media: messageDetails.mediaContent,
        content: messageDetails.textContent,
        userName: userDetails.userName,
        creationDate: messageDetails.creationDate
      }})
      setIsLoading(false);
    }

    getPostDetails()
  },[])


  const getURLParam = (name) => {
    var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
       return null;
    }
    else {
       return decodeURI(results[1]) || 0;
    }
  }

  const getTimeUntilToday = (date) => {
    let currentDate = new Date(Date.now());
    let postDate = new Date(Date.parse(date));
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = currentDate.getTime() - postDate.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  const messagePreview = (content) => {
    const maxLength = 200;
    let result = content.length > maxLength ? `${content.substring(0, 200)}...` : content;
    return result;
  }

  const PostWithTextOnly = (props) => {
    return (
      <div>
        <div className="post-content">
          {messagePreview(postData.content)}
        </div>
      </div>
    )
  }

  const PostWithMediaOnly = (props) => {
    return (
      <div className='media-post-body'>
        <div className="post-media">
          {
            postData.media[0]?
              <img src={postData.media[0]} className='post-photo' alt='post media'/>:
              null
          }
        </div>
      </div>
    )
  }

  const PostWithMixedContent = (props) => {
      return (
        <div className='media-post-body-mixed'>
          <div className="post-content">
            {messagePreview(postData.content)}
          </div>
          <div className="post-media-mixed">
          {
            postData.media[0]?
              <img src={postData.media[0]} className='post-photo' alt='post media'/>:
              null
          }
          </div>
        </div>
      )
  }

  const getPostDisplay = () => {
    if(postData.content && postData.media.length > 0){
      return <PostWithMixedContent />
    }
    else if(postData.content){
      return <PostWithTextOnly />
    }
    else{
      return <PostWithMediaOnly />
    }
  }


  const getPostStyle = (isSelected) => {
    return isSelected ? 'post-header post-header-selected' : 'post-header'
  }

  return (
        !isLoading ?
        <div className="post">
          <div className={getPostStyle(getURLParam("isSelected"))}>
            <img src={postData.profilePicture} alt='profile' className='avatar'/>
            <div>
              {postData.userName}
            </div>
            <div>
              {postData.likes} Likes
            </div>
            <div>
              {getTimeUntilToday(postData.creationDate)} Days ago
            </div>
          </div>
          <div className="post-body">
            {getPostDisplay()}
          </div>
      </div>
      :
      "LOADING"
  );
}

export default App;
