import React from 'react';
// import { useState } from 'react';
import '../src/index.css';
import 'flowbite/dist/flowbite.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// import ProfileCard from './days/day1/profilecard.jsx';

// import Exercises from './days/day2/Exercises.jsx';
// import '../src/days/day2/exercises.css';
// import WeatherWidget from './days/day2/WeatherWidget.jsx';
// import UserStats from './days/day2/UserStats.jsx';
// import BlogPreview from './days/day2/BlogPreview.jsx';
// import GradeCalculator from './days/day2/GradeCalculator.jsx';

// import ProductCard from './days/day3/ProductCard.jsx';
// import WhiteHeadphone from './days/day3/images/white_headphone.jpg';
// import BlackHeadphone from './days/day3/images/black_headphone.jpg';
// import BoseHeadphone from './days/day3/images/bose_black_headphone.jpg';
// import SonyHeadphone from './days/day3/images/sony_black_headphone.jpg';
// import Comment from './days/day3/CommentSection.jsx';
// import Card from './days/day3/CardComponent.jsx';
// import NavBar from './days/day3/NavComponent.jsx';
// import UserProfile from './days/day3/UserProfile.jsx';
// import defaultAvatar from './assets/default-avatar.png';

// import StudentCard from './days/day4/StudentCard';

// import MovieList from './days/day5/MovieList';
// import FilteredMovies from './days/day5/FilteredMovies';
// import SortedMovies from './days/day5/SortedMovies';
// import StudentAGrade from './days/day5/StudentGrade';
// import TodoList from './days/day5/Todo'

// import TimeGreeting from './days/day6/Greeting';
// import CartBadge from './days/day6/CartBadge';
// import UserDashboard from './days/day6/UserDashboard';
// import FormValidation from './days/day6/FormValidation';
// import ProductAvailable from './days/day6/ProductAvailable';

// import RecipeGallery from './days/day7/RecipeCard'; 

// import Handles from './days/day8/handles.jsx';

// import LucideApp from './days/day8/Learn';

// import AllComponent from './days/day9/learn';

// import MainComponent from './days/day10/learn';

// import MainComponent from './days/day11/learn.jsx';

// import MainComponent from './days/day12/learn';

// import MainComponent from './days/day12/hook';

// import MainComponent from './days/day13/learn';

import MainComponent from './days/day14/learn';
import Home from './days/day14/home.jsx';



const App = () => {
//   const user = {
//   name: 'Klaus Lynx',
//   role: 'Frontend Developer',
//   bio: 'Passionate about React and building amazing user experiences. Coffee enthusiast ☕',
//   location: 'Enugu State, NG',
//   avatar: defaultAvatar,
//   isOnline: true,
//   followers: '1.2k',
//   following: 345,
//   posts: 12,
//   social: {
//     twitter: 'https://twitter.com/klauslynx',
//     github: 'https://github.com/klauslynx',
//     linkedin: 'https://linkedin.com/in/klauslynx'
//   }
// };


// const movies = [
//   { id: 1, title: 'Inception', rating: 8.8 },
//   { id: 2, title: 'The Matrix', rating: 8.7 },
//   { id: 3, title: 'Interstellar', rating: 8.6 },
// ];

// const students = [
//   { id: 1, name: 'Alice', grade: 'A' },
//   { id: 2, name: 'Bob', grade: 'B' },
//   { id: 3, name: 'Charlie', grade: 'A' },
//   { id: 4, name: 'Diana', grade: 'C' },
// ];

// const todos = [
//   { id: 1, text: 'Learn React', done: true },
//   { id: 2, text: 'Build a project', done: false },
//   { id: 3, text: 'Master lists', done: true },
// ];

  return (

    // <>
    //   <ProfileCard />;
    // </>

    // <>
    //   <>
    //     <Exercises />

    //     <WeatherWidget />

    //     <UserStats />

    //     <GradeCalculator /> 
    //   </>
    //     <BlogPreview />
    // </>


    // <>
    //   <ProductCard 
    //     name="Wireless Headphones"
    //     price={99.99}
    //     image={WhiteHeadphone}
    //     inStock={true}
    //   />
    //   <ProductCard 
    //     name="Wireless Headphones"
    //     price={179.99}
    //     image={SonyHeadphone}
    //     inStock={false}
    //   />
    //   <ProductCard 
    //     name="Wireless Headphones"
    //     price={292.99}
    //     image={BoseHeadphone}
    //     inStock={true}
    //   />
    //   <div>
    //     <Comment />
    //   </div>
    //   <div>
    //     <Card title="User Info">
    //       <p>Name: John</p>
    //       <p>Email: john@email.com</p>
    //     </Card>

    //     <Card title="Settings">
    //       <button style={{
    //         padding: '10px 20px',
    //         margin: '5px',
    //         backgroundColor: '#2196f3',
    //         color: 'white',
    //         border: 'none',
    //         borderRadius: '5px',
    //         cursor: 'pointer',
    //         fontSize: '14px'
    //       }}>Dark Mode</button>

    //       <button style={{
    //         padding: '10px 20px',
    //         margin: '5px',
    //         backgroundColor: '#2196f3',
    //         color: 'white',
    //         border: 'none',
    //         borderRadius: '5px',
    //         cursor: 'pointer',
    //         fontSize: '14px'
    //       }}>Notifications</button>
    //     </Card>
    //   </div>

    //   <div>
    //     <NavBar />
    //   </div>

    //   <div>
    //     {/* <UserProfile/> */}
    //     <UserProfile user={user} />
    //   </div>
    // </>


    // <>
    // <StudentCard name='Klaus' grade={50} subject='Coding' isEnrolled />
    // </>


    // <>
    // <MovieList movies={movies} />
    // <FilteredMovies movies={movies} />
    // <SortedMovies movies={movies} />
    // <StudentAGrade studentInfo={students} />

    // <div>
    //   <TodoList todos={todos} />
    // </div>
    // </>


    // <>
    // <TimeGreeting />
    //  <UserDashboard userRole = 'Admin' />
    //  <CartBadge />
    //  <div>
    //   <FormValidation />
    //  </div>
    //  <div>
    //   <ProductAvailable stock={15} />
    //   <ProductAvailable stock={5} />
    //   <ProductAvailable stock={0} />
    //  </div>
    // </>


    // <div className="app-container">
    //   <RecipeGallery />
    // </div>

    <>
    {/* <Handles /> */}
    {/* <LucideApp /> */}
    {/* <AllComponent /> */}
    {/* <MainComponent /> */}
    <BrowserRouter basename="/todo">
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

  export default App




















// import React, { useState } from 'react';
// import DayComponent from './days/DayComponent.jsx';
// import '../src/index.css';

// const App = () => {
//   const [selectedDay, setSelectedDay] = useState('day1');

//   // Update this list as you create new days!
//   const daysAvailable = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];

//   const Greetingmessage = "Hello, welcome to React tutorials!";

//   return (
//     <div className="app-container">
//       <div className="app">
//         <div className="left">
//           <h1>React 100 Days Challenge</h1>
          
//           {/* Dropdown Selector */}
//           <div style={{ marginBottom: '2rem' }}>
//             <label htmlFor="day-select" style={{ marginRight: '1rem', fontWeight: 'bold' }}>
//               Choose a day:
//             </label>
//             <select
//               id="day-select"
//               value={selectedDay}
//               onChange={(e) => setSelectedDay(e.target.value)}
//               style={{
//                 padding: '8px 12px',
//                 fontSize: '1rem',
//                 borderRadius: '8px',
//                 border: '2px solid orange',
//               }}
//             >
//               {daysAvailable.map((day) => (
//                 <option key={day} value={day}>
//                   {day.toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <p>{Greetingmessage}</p>
//             <p>My Name is <strong>Klaus Lynx</strong></p>
//             <p>
//               My favorite color is orange{' '}
//               <span
//                 style={{
//                   backgroundColor: 'orange',
//                   display: 'inline-block',
//                   width: '20px',
//                   height: '20px',
//                   borderRadius: '4px',
//                   marginLeft: '8px',
//                 }}
//               ></span>
//             </p>
//           </div>

//           <img
//             style={{
//               width: '250px',
//               height: '250px',
//               objectFit: 'cover',
//               marginTop: '3rem',
//               borderRadius: '12px',
//             }}
//             src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
//             alt="ocean view"
//           />
//         </div>

//         {/* Right Side - Shows the selected day's project */}
//         <div className="right" style={{ flex: 1, padding: '2rem' }}>
//           <DayComponent day={selectedDay} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;