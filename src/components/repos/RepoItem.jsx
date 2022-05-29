import { FaStar } from 'react-icons/fa'

const RepoItem = ({ repo: { name, description, watchers_count } }) => {
  return (
    <li className="card">
      <h1 className="card__header">{name}</h1>
      <p className="card__subheader">{description}</p>
      <p className="card__additional-info">
        <FaStar className="card-icon" />
        {watchers_count}
      </p>
    </li>
  )
}

export default RepoItem
