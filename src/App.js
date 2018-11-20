import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  
  //state는 컴포넌트를 로드하는 방법
  state={};

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies=()=>{
    const movies=this.state.movies.map((movie)=>{
      return( <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
      );
    }); //const movies=[<Movice props/>,<Movie props/>]
    return movies;
  };

   _getMovies= async()=>{
    const movies=await this._callApi()
    this.setState({
      movies
    });
    //await: 작업이 완료되기 전까지 기다림
    //async 쓰지 않으면 await도 못씀

  };
  _callApi=()=>{
    //fetch promise를 return, 이 모든 데이터는 제이슨임
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=donwload_count")//fetch는 ajax로 받을수있음
    .then(potato=>potato.json()) //response로 체크, 제이슨 변ㄹ한, 
    .then(json=> json.data.movies)//화살표 자체에 return 기능있음
    .catch(err=>console.log(err))
  };

  render() {
    const{movies}=this.state;
    return (
      <div className={movies?"App":"App-loading"}>
        {movies ? this._renderMovies():'Loading' /*내가 찾고있는 데이터가 있는지 확인*/} 
      
        {/*this.state.movies.map((movie, index)=>{
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })*/}
        
        {/*movies.map(function(movie){
          return  <Movie title={movie.title} poster={movie.poster}/>
        })*/}
        
      </div>
    );
  }
}

export default App;
