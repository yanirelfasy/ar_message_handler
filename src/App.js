import './App.css';
import {useEffect} from 'react';


function App() {

  useEffect(() => {
    playVideo("media-video")
  })

  const DEMO_POSTS = {
    "0001": {
      id:  "0001",
      user: "Yanir Elfassy",
      content: "Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points Test message! Thats how the content will look like on close points ",
      profile_picutre: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: new Date("09/10/2021"),
      likes: 35,
      media: {
        photos: ['https://www.brides.com/thmb/daHLiJ0Tv2kw7k1Yh8eRwfbF0hw=/4656x2619/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__brides__proteus__5c40fd368b27912d65776fbf__169-def134e374394adaa7b6e2f3cbcdac37.jpeg'],
        videos: []
      }
    },
    "0002": {
      user: "Yanir Elfassy",
      content: null,
      profile_picutre: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: new Date("09/10/2021"),
      likes: 35,
      media: {
        photos: [
          'https://images.unsplash.com/photo-1540324155974-7523202daa3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFuY2V8ZW58MHx8MHx8&w=1000&q=80',
        ],
        videos: []
      }
    },
    "0003":{
      user: "Yanir Elfassy",
      content: "זה פוסט רק עם מלל",
      profile_picutre: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: new Date("09/10/2021"),
      likes: 35,
      media: {
        photos: [],
        videos: []
      }
    },
    "0004":{
      user: "Yanir Elfassy",
      content: "זה פוסט רק עם מלל",
      profile_picutre: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: new Date("09/10/2021"),
      likes: 35,
      media: {
        photos: [],
        videos: []
      }
    }
  }

  const getMarkerID = (name) => {
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
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = currentDate.getTime() - date.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  const messagePreview = (content) => {
    const maxLength = 200;
    let result = content.length > maxLength ? `${content.substring(0, 200)}...` : content;
    return result;
  }

  const PostWithTextOnly = (props) => {
    const {postData} = props;
    return (
      <div>
        <div className="post-content">
          {messagePreview(postData.content)}
        </div>
      </div>
    )
  }

  const PostWithMediaOnly = (props) => {
    const {postData} = props;
    return (
      <div className='media-post-body'>
        <div className="post-media">
          {
            postData.media.photos[0]?
              <img src={postData.media.photos[0]} className='post-photo' alt='post media'/>:
              null
          }
        </div>
      </div>
    )
  }

  const PostWithMixedContent = (props) => {
    const {postData} = props;
      return (
        <div className='media-post-body-mixed'>
          <div className="post-content">
            {messagePreview(postData.content)}
          </div>
          <div className="post-media-mixed">
          {
            postData.media.photos[0]?
              <img src={postData.media.photos[0]} className='post-photo' alt='post media'/>:
              null
          }
          </div>
        </div>
      )
  }

  const getPostDisplay = (postData) => {
    if(postData.content && (postData.media.photos.length > 0 || postData.media.videos.length > 0)){
      return <PostWithMixedContent postData={postData}/>
    }
    else if(postData.content){
      return <PostWithTextOnly postData={postData}/>
    }
    else{
      return <PostWithMediaOnly postData={postData}/>
    }
  }

  const playVideo = (videoID) => {
    let myVideo = document.getElementById(videoID)
    if(myVideo){
      myVideo.play();
    }
  }

  return (
    <div className="post">
      <div className="post-header">
        <img src={DEMO_POSTS[getMarkerID("markerID")].profile_picutre} alt='profile' className='avatar'/>
        <div>
        {DEMO_POSTS[getMarkerID("markerID")].user}
        </div>
        <div>
          {DEMO_POSTS[getMarkerID("markerID")].likes} Likes
        </div>
        <div>
          {getTimeUntilToday(DEMO_POSTS[getMarkerID("markerID")].date)} Days ago
        </div>
      </div>
      <div className="post-body">
        {getPostDisplay(DEMO_POSTS[getMarkerID("markerID")])}
      </div>
    </div>
  );
}

export default App;
