import React from 'react';
import { Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard, faSquareMinus,faFolderTree,faFileInvoiceDollar,faTruck} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function SideBar() {
    const menuItem = [
      {
        name: "Menus",
        sub: [
          { cat: "Add Menu", path: "addmenu" },
          { cat: "Add MenuItems", path: "addmenuitems" },
          { cat: "View Menu", path: "viewmenu" },
          { cat: "View MenuItems", path: "viewmenuitems" },
        ],
        icon: faSquareMinus,
      },
      {
        name: "Orders",
        sub: [
          { cat: "Pending", path: "orderspending" },
          { cat: "Completed", path: "orderscompleted" },
        ],
        icon: faFolderTree,
      },
      {
        name: "Invoice",
        sub: [{ cat: "Invoice List", path: "invoice" }],
        icon: faFileInvoiceDollar,
      },
      {
        name: "Additional",
        sub: [
          { cat: "Add Topping", path: "addtopping" },
          { cat: "Add Base", path: "addbase" },
          { cat: "View Topping", path: "viewtopping" },
          { cat: "View Base", path: "viewbase" },
        ],
        icon: faSquareMinus,
      }
    ];
    return ( 
        <div className='pb-3'>
            
            <Accordion className='py-2' defaultActiveKey={null}>
                <Accordion.Item className='py-2'>
                    <Link
                        to={'/'}
                        className='accordion-button-dashboard link p-4'
                        style={{backgroundImage:'transparent', boxShadow: 'none', border: 'transparent', outline: 'none', cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon className='pe-3 fs-4' icon={faChessBoard} />
                        <span className='fs-5'>Dashboard</span>
                    </Link>
                </Accordion.Item>
            </Accordion>

            {menuItem.map(item=>
                <Accordion className='py-2' defaultActiveKey={null}>
                    <Accordion.Item  >
                        <Accordion.Header style={{boxShadow:'none',border:'transparent',outline:'none'}}>
                        <FontAwesomeIcon className='pe-3 fs-4' icon={item.icon} />
                            <span className='fs-5 '>{item.name}</span>
                        </Accordion.Header>
                        <Accordion.Body >
                        
                            {item.sub.map(n=>
                                <h6 className='p-3' >
                                    <Link className='link'  style={{textDecoration:'none',color:'black'}} to={n.path}>{n.cat}</Link>
                                </h6>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}

            <Accordion className='py-2' defaultActiveKey={null}>
                <Accordion.Item className='py-2'>
                    <Link
                        to={'/viewdeliverypartner'}
                        className='accordion-button-dashboard link p-4'
                        style={{backgroundImage:'transparent', boxShadow: 'none', border: 'transparent', outline: 'none', cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon className='pe-3 fs-4' icon={faTruck} />
                        <span className='fs-5'>Delivery Partner</span>
                    </Link>
                </Accordion.Item>
            </Accordion>
        </div>
     );
}

export default SideBar;