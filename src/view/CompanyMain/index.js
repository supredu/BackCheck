import React,{ useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { Avatar, Tooltip ,List,Card, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { getAllCompany } from '../../assets/company/company';
import './index.css'; 
import { assets } from '../../assets/assets';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const CompanyMain = () => {
    const navigate = useNavigate();
    const companies=getAllCompany()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    // const companies = [
    //     {
    //       name: 'Company A',
    //       logo: `${assets.cover}`,
    //     },
    //     {
    //       name: 'Company B',
    //       logo: `${assets.cover}`,
    //     },
    //     {
    //       name: 'Company C',
    //       logo: `${assets.cover}`,
    //     },
    //      {
    //         name: 'Company D',
    //         logo: `${assets.cover}`,
    //       },
    //       {
    //         name: 'Company E',
    //         logo: `${assets.cover}`,
    //       },
    //       {
    //         name: 'Company F',
    //         logo: `${assets.cover}`,
    //       },
    //   ];
      const [items, setItems] = React.useState(companies);

      const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(items);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);
    
        setItems(reorderedItems);
      };
  return (
   <div className='company_main_container'>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Company"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%'
          }
        }}
      >
        <Button onClick={closeModal}>Close</Button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSezeuVQYO_NnoqEbFLMMBLVrT4zd0fsPy-2RnZohlUODisI3Q/viewform?usp=sf_link"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </Modal>
    <div className='com_main'>
        <button className='com_main_btn' onClick={()=>{
          openModal()
          console.log(`openModal: ${modalIsOpen}`)
        // window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSezeuVQYO_NnoqEbFLMMBLVrT4zd0fsPy-2RnZohlUODisI3Q/viewform?usp=sf_link";
      }}>
            Create New Company
       </button>
       <hr/>
       <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="companies" direction="horizontal">
          {(provided) => (
            <div
              className="company-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((company, index) => (
                <Draggable key={company.name} draggableId={company.name} index={index}>
                  {(provided) => (
                    <motion.div
                      className="company-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={()=>{navigate(`sub_company/${company.id}`);}}
                      layout
                    >
                      <Avatar size={70} src={company.image} />
                      <div className="company-details">
                        <h2>{company.name}</h2>
                      </div>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
    
   </div>
  );
};

export default CompanyMain;
