window.QueryResult=React.createClass({
  render(){
    return <div className='result-box'>
      <h6>
        {this.props.result.email}
      </h6>
      <small>
        {this.props.result.found.map(found=>{
          return <span
              key={`result-competence-${this.props.result.id}-${found.competence_id}`}
              className='result-competence'>
            {found.title} ({found.level})
          </span>;
        })}
      </small>
    </div>;
  }
});
