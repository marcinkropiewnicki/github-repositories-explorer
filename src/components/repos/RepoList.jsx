import React from 'react'
import RepoItem from './RepoItem'

const RepoList = ({ repos }) => {
  // console.log(repos)
  if (repos.length < 1) {
    return (
      <div className="accordion-item__content accordion-item__content--empty">
        empty
      </div>
    )
  }

  return (
    <ul className="accordion-item__content">
      {repos.map(repo => (
        <RepoItem key={repo.name} repo={repo} />
      ))}
    </ul>
  )
}

export default RepoList
