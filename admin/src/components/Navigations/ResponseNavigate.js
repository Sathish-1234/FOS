import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFileCirclePlus, faEye, faDolly, faFileInvoiceDollar, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function ResponseNavigate() {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (icon) => {
    if (activeIcon === icon) {
      setActiveIcon(null);
    } else {
      setActiveIcon(icon);
    }
  };

  const renderDropdown = (icon) => {
    if (activeIcon === icon) {
      return (
        <div className="dropdown dropdown-menu show bg-white ">
          <div className="dropdown-options"> {/* Set the top position to move the dropdown above the icon */}
            {/* Add your dropdown content here */}
            {icon === 'add' ? (
              <div className='d-flex'>
                <Link onClick={()=>handleIconClick('')} to={'/addmenu'} className='link'>menu <FontAwesomeIcon icon={faGripLinesVertical} /> </Link>
                <Link onClick={()=>handleIconClick('')} to={'/addmenuitems'} className='ps-1 link'>menuitems</Link>
              </div>
            ) : icon === 'view' ? (
              <div className='d-flex'>
                <Link onClick={()=>handleIconClick('')} className='link' to={'/viewmenu'}>menu <FontAwesomeIcon icon={faGripLinesVertical} /> </Link>
                <Link onClick={()=>handleIconClick('')} to={'/viewmenuitems'} className='ps-1 link'>menuitems</Link>
              </div>
            ) : icon === 'order' ? ( 
              <div className='d-flex'>
                <Link onClick={()=>handleIconClick('')} className='link' to={'/orderspending'}>Pending <FontAwesomeIcon icon={faGripLinesVertical} /></Link>
                <Link onClick={()=>handleIconClick('')} to={'/orderscompleted'} className='ps-1 link'>Completed</Link>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='py-3 d-flex justify-content-around'>
      <div className='fs-2 dropdown'>
        <Link to={'/'} onClick={()=>handleIconClick('')} className="d-inline-block link">
          <FontAwesomeIcon icon={faChartLine} />
        </Link>
      </div>
      <div className='fs-2 dropdown'>
        <div style={{position:'absolute',top:-50,left:-35}}>{renderDropdown('add')}</div>
        <div className="d-inline-block" onClick={() => handleIconClick('add')}>
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </div>
      </div>
      <div className='fs-2 dropdown'>
        <div style={{position:'absolute',top:-50,left:-35}}>{renderDropdown('view')}</div>
        <div className="d-inline-block" onClick={() => handleIconClick('view')}>
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
      <div className='fs-2 dropdown'>
        <div style={{position:'absolute',top:-50,left:-50}}>{renderDropdown('order')}</div>
        <div className="d-inline-block" onClick={() => handleIconClick('order')}>
          <FontAwesomeIcon icon={faDolly} />
        </div>
      </div>
      <Link onClick={()=>handleIconClick('')} to={'/invoice'} className='fs-2 link'>
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
      </Link>
    </div>
  );
}

export default ResponseNavigate;
