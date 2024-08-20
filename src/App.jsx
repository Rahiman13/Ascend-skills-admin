// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Course from './components/CourseList';
// import CourseForm from './components/CourseForm'
// import Review from './components/Review'
// import AddPhdHolderForm from './components/AddPhdHolderForm';
// // import AddCourseForm from './components/AddCourseForm';
// import PhdHolderList from './components/PhdHolderList';
// import AddReviewForm from './components/AddReviewForm';
// import ListReviews from './components/ListReviews';
// import ListTeamMembers from './components/ListTeamMembers';
// import CollegeList from './components/CollegeList';
// import AddAuthorForm from './components/AddAuthorForm';
// import AuthorList from './components/AuthorList';
// import './App.css'

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<AuthorList />} />
//           <Route path="/author-form" element={<AddAuthorForm />} />
//           <Route path="/college-list" element={<CollegeList />} />
//           <Route path="/team-list" element={<ListTeamMembers />} />
//           <Route path="/listreviews" element={<ListReviews />} />
//           <Route path="/phdholders" element={<PhdHolderList />} />
//           <Route path="/addphdHolders" element={<AddPhdHolderForm />} />
//           <Route path="/courseform" element={<CourseForm />} />
//           <Route path="/course" element={<Course />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           {/* // <Route path='/' element={<Review />} /> */}
//         </Routes>
//       </div>
//     </Router>

//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Dashboard/Sidebar';
import TopNavBar from './components/Dashboard/TopNavBar';
import DashboardContent from './components/Dashboard/DashboardContent';
// import Footer from './components/Dashboard/Footer';
import Courses from './components/Dashboard/Courses page/CoursesPage';
import Authors from './components/Dashboard/Authors_page/AuthorsPage';
import Teams from './components/Dashboard/Team_page/TeamManagement';
import Colleges from './components/Dashboard/College_page/CollegesPage';
import PhdHolders from './components/Dashboard/PhdHolders_page/PhdHoldersPage';
import Company from './components/Dashboard/Comapny_page/CompanyPage';
import Contacts from './components/Dashboard/Contact_page/ContactPage';
import Placements from './components/Dashboard/Placements_page/PlacementsPage';
import Internships from './components/Dashboard/Internships_page/InternshipPage';
import Roadmaps from './components/Dashboard/Roadmaps_page/RoadmapsPage';
import VideoReviews from './components/Dashboard/VideoReview_page/VideoReviewsPage';
import Reviews from './components/Dashboard/Reviews_page/ReviewsPage';
import Services from './components/Dashboard/Services_page/ServicesPage';
import Adresses from './components/Dashboard/Address_page/AddressesPage';
// import s from './components/Dashboard/Team_page/TeamMembersPage';
// Add additional imports for other components here
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/phd-holders" element={<PhdHolders />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/companies" element={<Company />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/video-reviews" element={<VideoReviews />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/services" element={<Services />} />
              <Route path="//address" element={<Adresses />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
