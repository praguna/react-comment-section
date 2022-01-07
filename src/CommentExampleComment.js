import {React, useState} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

const image_url = "https://www.gravatar.com/avatar"
const current_user = "Me"

const data = [
  {author : "Matt",  comment : "How artistic!", day : "Today", comments : [] },
  {author : "Elliot Fu",  comment : "This has been very useful for my research. Thanks as well!", day : "Today", comments : [
    {author : "Jenny Hess",  comment : "Elliot you are always so right :)", day : "Today", comments : []},  
  ]},
  {author : "Joe Henderson",  comment : "Dude, this is awesome. Thanks so much", day : "Yesterday", comments : []},
]

const DataComment = (props) => {
  const [hideReply , setHideReply] = useState(true)
  const [comments, setComments] = useState(props.data.comments? props.data.comments : [])
  const [userComment, setUserComment] = useState("")


  return (
      <Comment>
      <Comment.Avatar src={image_url} />
      <Comment.Content>
        <Comment.Author as='a'>{props.data.author}</Comment.Author>
        <Comment.Metadata>
          <div>{props.data.day}</div>
        </Comment.Metadata>
        <Comment.Text>{props.data.comment}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick = {()=>{setHideReply(!hideReply)}}>Reply</Comment.Action>
          <Form reply hidden = {hideReply} onSubmit={()=>{
              console.log(userComment)
              if(!userComment || userComment === "") return
              const newComment = {author : current_user,  comment : userComment, day : "Today", comments : [] }
              setComments(comments.concat(newComment))
              setUserComment("")
              setHideReply(true)
          }}>
            <Form.TextArea value={userComment} onChange={(e => setUserComment(e.target.value))}/>
            <Button type="submit" content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
        </Comment.Actions>
        <Comment.Group> 
          {comments && comments.length > 0 && (comments.map((e, i)=>{
              return <DataComment data = {e}/>
          }))}
        </Comment.Group>
      </Comment.Content>
    </Comment>
   )

}




const CommentExampleComment = () => (
  <div style={{marginLeft : 30 + "rem", marginTop : 5 + "rem"}}>
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {data.map((e, i)=><DataComment data = {e}/>)}
    </Comment.Group>
  </div>
)

export default CommentExampleComment
