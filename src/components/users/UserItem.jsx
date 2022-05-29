import RepoList from '../repos/RepoList'

const UserItem = ({ user: { login, repos } }) => {
  return (
    <div className="accordion-item">
      <input type="checkbox" id={login} className="accordion-item__switch" />
      <label className="accordion-item__label" htmlFor={login}>
        {login}
      </label>
      <RepoList repos={repos} />
    </div>
  )
}

export default UserItem
