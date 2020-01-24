import React, { Component } from "react";
import "./Feed.css";
import io from "socket.io-client";
import like from "../assets/like.svg";
import send from "../assets/send.svg";
import comment from "../assets/comment.svg";
import more from "../assets/more.svg";
// import post from "../assets/post.jpg";
import api from "../services/api";

class Feed extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  //Atualizar a pagina automaticamente - SocketIo
  registerToSocket = () => {
    //url do backend
    const socket = io("http://localhost:3333");

    //escutando a mensagem 'post' que veio la do backend
    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {/* pecorrendo os posts */}

        {this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} alt="tres pontinhos" />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt="imagem post"
            />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="like" />
                </button>
                <img src={comment} alt="comment" />
                <img src={send} alt="send" />
              </div>

              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span> {post.hashtags} </span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
