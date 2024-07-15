import logo from './logo.svg';
import './App.css';
import MyHeader from './component/Header';
import { assets } from './assets/assets';
import { Col, Row } from 'antd';
import MyFooter from './component/Footer';
import {Routes,Route} from "react-router-dom"
import MyHome from './component/Home';
import CompanyMain from './view/CompanyMain';
import CompanySub from './view/CompanySub';
import Talent from './view/Talent';
import Information from './view/Information';

function App() {
  return (
    <>
    
    <div className='app'>
      <Row>
        <Col span={24}>
        <MyHeader />
        </Col>
      </Row>
    
       <Routes>
        <Route path='/' element={<MyHome/>}/>
        <Route path='/home' element={<MyHome/>}/>
        <Route path='/company' element={<CompanyMain/>}/>
        <Route path='/company/sub_company' element={<CompanySub/>}/>
        <Route path='/talent' element={<Talent/>}/>
        <Route path='/information' element={<Information/>}/>
      </Routes>
    </div>

    {/* <Row>
        <Col span={24}> <MyFooter/></Col>
      </Row> */}
    </>
   
  );
}

export default App;
