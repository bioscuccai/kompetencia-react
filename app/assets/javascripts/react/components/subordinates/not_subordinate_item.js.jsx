window.NotSubordinateItem=React.createClass({
  render(){
    return <div className="row">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <button onClick={this.onAddSubordinate}>+</button>        
      </div>
    </div>;
  },
  
  onAddSubordinate(e){
    e.preventDefault();
    userActions.addSubordinate(this.props.profileUser.id, this.props.user.id);
  }
});
