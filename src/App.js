import React from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

const NotFound = () => "Страница не найдена";

NotFound.displayName = "NotFound123";

function withQuery(Component) {
  return class ComponentWithQuery extends React.Component {
    state = {
      data: null,
      isLoading: true,
      error: null,
    };

    async componentDidMount() {
      try {
        const response = await fetch(this.props.url);
        const data = await response.json();

        this.setState({
          data,
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          error,
        });
      }
    }

    render() {
      if (this.state.isLoading) {
        return "...Loading...";
      }

      if (this.state.error) {
        return this.state.error.message;
      }

      return <Component {...this.props} data={this.state.data} />;
    }
  };
}

const PostsList = ({ history, data: posts }) => {
  if (posts === null) {
    return "Загрузка постов";
  }

  return (
    <>
      <button onClick={() => history.push("/users")}>Назад</button>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </>
  );
};

const PostsListWithQuery = withQuery(withRouter(PostsList));
const UsersList = ({ history, data: users }) => {
  if (!users) {
    return "Загрузка пользователей";
  }

  return (
    <>
      <button onClick={() => history.push("/posts")}>Назад</button>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ol>
    </>
  );
};

const UsersListWithQuery = withRouter(withQuery(UsersList));

const UserDetails = ({ data: user, color, headerText }) => {
  if (!user) {
    return "Загрузка данных пользователя";
  }

  return (
    <div>
      <h1>{headerText}</h1>
      <h1 style={{ backgroundColor: color }}>{user.name}</h1>
      <h3>Address:</h3>
      <p>
        {user.address.zipcode}, {user.address.city}, {user.address.street},{" "}
        {user.address.suite}
      </p>
    </div>
  );
};

const Menu = () => (
  <div>
    <div>
      <NavLink to="/posts" className="menu-item">
        Посты
      </NavLink>
      <NavLink to="/users" className="menu-item">
        Пользователи
      </NavLink>
    </div>
  </div>
);

const UserDetailsWithQuery = ({ match }) => {
  const Component = withQuery(UserDetails);
  return (
    <Component
      url={`http://jsonplaceholder.typicode.com/users/${match.params.id}`}
    />
  );
};

const UserDetailsWithRouter = withRouter(UserDetailsWithQuery);

export const BlogAppUpdated = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <Route exact path="/users">
        <UsersListWithQuery url="https://jsonplaceholder.typicode.com/users" />
      </Route>
      <Route path="/users/:id">
        <UserDetailsWithRouter />
      </Route>
      <Route path="/posts">
        <PostsListWithQuery url="https://jsonplaceholder.typicode.com/posts" />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default BlogAppUpdated;
