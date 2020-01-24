import React, { Component } from "react";
import "./New.css";
import api from "../services/api";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };
  handleSubmit = async e => {
    //Evita enviar o usuario para a outra pagina
    e.preventDefault();

    console.log(this.state);

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post("posts", data);
    //direciona para a rota padrao apos o submmit
    this.props.history.push("/");
  };
  //funcao para salvar a imagem
  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };
  //funcao para salvar os valores do input
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor do Post"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do Post"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do Post"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do Post"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />

        <button type="submit"> Enviar </button>
      </form>
    );
  }
}

export default New;
