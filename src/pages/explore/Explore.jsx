import React from 'react'
import './explore.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Search from '../../components/explore/search/Search';
import Checklist from '../../components/explore/checklist/Checklist';


const Explore = () => {
  return (
    <>
      <Header/>
      <Search/>
      <Checklist/>
      <Footer/>
    </>
  )
}

export default Explore;