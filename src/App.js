

function App() {
  return (
    <div className="trello-master">
      <nav className="navbar-app">App bar</nav>
      <nav className="navbar-board">Board bar</nav>
      <div className="board-columns">
        <div className="column">
        <header>brainstorm</header>
          <ul>
            <li>
              <img className="photo" src="https://img.meta.com.vn/Data/image/2021/07/29/sinh-nhat-doraemon-12.jpg"></img>
              Design and Research
            </li>
            <li>second</li>
            <li>Third</li>
          </ul>
          <footer>Add another card </footer>
        </div>


        <div className="column">
        <header>brainstorm</header>
          <ul>
            <li>
              <img className="photo" src="https://img.meta.com.vn/Data/image/2021/07/29/sinh-nhat-doraemon-12.jpg"></img>
              Design and Research
            </li>
            <li>second</li>
          </ul>
          <footer>Add another card </footer>
        </div>
         
         
      </div>
  </div>

  
  );
}

export default App;
