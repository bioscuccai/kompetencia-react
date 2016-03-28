window.NewCompetenceTier=React.createClass({
  render(){
    return <div>
      <form onChange={this.handleFormSubmit}>
        <div>
          <input type='text' ref='title' placeholder='Megnevezés'></input>
        </div>
        <div>
          <input type='text' ref='description' placeholder='Leírás'></input>
        </div>
        <div>
          <input type='submit' value='Új kategória'></input>
        </div>
      </form>
    </div>;
  },
  
  handleFormSubmit(e){
    e.preventDefault();
  }
});