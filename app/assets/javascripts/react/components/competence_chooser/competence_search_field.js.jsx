window.CompetenceSearchField=React.createClass({
  render(){
    return <div>
      <input type="text" placeholder="Keresés" onChange={this.handleSearchChange}/>
    </div>;
  },
  
  handleSearchChange(e){
    if(this.props.searchChanged){
      this.props.searchChanged(e.target.value);
    }
  }
});
