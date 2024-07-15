import React,{useState} from 'react';
import { Avatar, Button ,Tooltip} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { assets} from '../../assets/assets';
import './index.css'; 
const company = {
    name: 'Company A',
    logo: 'https://via.placeholder.com/150',
    description: "thethethethethethethethethethehethethethethethethethethethethethethethe thethethethethethethethethethetthetheth ethethethethethet hethethethet hethethethethethethethethethethethet hethethethethethethethethethethethethet hethethethethethethethethethethethethethethethethethethethethethethethethethethethethethet hethethethethethethethethethethethethethethethethethethethethethethethethethethethetheth ethethethethethethethethethethethe",
    employees: [
      { id: 1, name: 'Employee 1', avatar: `${assets.avatar}` },
      { id: 2, name: 'Employee 2', avatar:  `${assets.avatar}` },
      { id: 3, name: 'Employee 3', avatar: `${assets.avatar}` },
      { id: 4, name: 'Employee 4', avatar: `${assets.avatar}` },
      { id: 5, name: 'Employee 5', avatar:`${assets.avatar}` },
      { id: 6, name: 'Employee 6', avatar: `${assets.avatar}` }
    ]
  };

const CompanySub = () => {
    const [employees, setEmployees] = useState(company.employees);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedEmployees = Array.from(employees);
        const [reorderedItem] = reorderedEmployees.splice(result.source.index, 1);
        reorderedEmployees.splice(result.destination.index, 0, reorderedItem);
    
        setEmployees(reorderedEmployees);
      };
   
  return (
   <div className='company_sub_container'>
        <div className='company_base_info'>
            <img src={assets.cover} className='company_img'/>
            <span className='company_name'>DU Company</span>
            <button className='company_base_btn'>
                Add address to whitelist
            </button>


         </div>

         <div className='company_base_description'>

         <div className="company-left">
                {/* <Avatar size={100} src={company.logo} /> */}
                <Tooltip title={company.description}>
                    <div className='company-description'>{company.description}</div>
                </Tooltip>
            </div>
            
            <div className="company-right">
                    <div className='com_font'>Certificate owners</div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="employees" direction="horizontal">
                        {(provided) => (
                        <div
                            className="employee-grid"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {employees.map((employee, index) => (
                            <Draggable key={employee.id} draggableId={employee.id.toString()} index={index}>
                                {(provided) => (
                                <motion.div
                                    className="employee-item"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    layout
                                >
                                    <Tooltip title={employee.name}>
                                            <Avatar size={50} src={employee.avatar} />
                                    </Tooltip>
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
                <button className='company_base_btn'>
                        Ask to mint
                    </button>
         </div>
         

    
   </div>
  );
};

export default CompanySub;
