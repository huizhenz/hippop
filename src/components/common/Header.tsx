import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Login from '../../pages/Login';
import { UserInfo } from '../../types/types';
import { setUserStore, useCurrentUser } from '../../store/userStore';
import Alarm from './Alarm';
import AlarmBox from './AlarmBox';
import { supabase } from '../../api/supabase';
import { User } from '@supabase/supabase-js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/user';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 유저 셋 해주는 함수 가져오기
  const setCurrentUser = setUserStore((state) => state.setCurrentUser);
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const { data: user } = useQuery(['user', currentUserId], () => getUser(currentUserId ?? ''));

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      // 클릭한 요소가 메뉴나 관련된 요소가 아닌 경우에만 메뉴 닫기
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('error=>', error);
    } else {
      navigate('/');
      alert(':) 안녕히가세요 !');
    }
  };

  const ToggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
  };

  return (
    <HeaderTag>
      <div className="header-wrapper">
        <Alarm />
        <div className="logo-wrapper">
          <Link to="/">
            <img src="/asset/nyb_logo.png" className="nyb-logo" alt="nyb-img" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/review">Review</Link>
          </li>
          <li>
            <Link to="/mate">Mate</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        <div>
          <div className="user-info">
            {user ? (
              <>
                <ul style={{ position: 'relative' }}>{isAlarmOpen && <AlarmBox />}</ul>
                <div className="user-dropdown" onClick={handleMenuToggle} ref={menuRef}>
                  <div className="info-mate">
                    <div className="welcome-mate">
                      <p>Hello,</p>
                      <p>{user.name}님</p>
                    </div>
                    {user.avatar_url && user.avatar_url.startsWith('profile/') ? (
                      <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${user.avatar_url}`} alt="User Avatar" />
                    ) : (
                      <img src={user.avatar_url} alt="User Avatar" />
                    )}
                  </div>
                  <div className="dropdown-content" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div
                      onClick={() => {
                        navigate(`/mypage/${user.id}`);
                      }}
                    >
                      My Page
                    </div>
                    <div onClick={handleLogOut}>Logout</div>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={openLoginModal}>Login</button>
            )}
            <AlarmButton onClick={ToggleAlarm} style={{ marginLeft: '10px' }} />
          </div>
          {isModalOpen && (
            <ModalWrapper isopen={isModalOpen} onClick={handleModalOutsideClick}>
              <Login closeModal={closeModal} />
            </ModalWrapper>
          )}
        </div>
      </div>
    </HeaderTag>
  );
}
export default Header;

const HeaderTag = styled.header`
  background-color: var(--primary-color);
  color: white;
  width: 100%;
  height: 80px;
  .header-wrapper {
    margin: 0 auto;
    height: 100%;
    max-width: 1920px;
    min-width: 800px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      margin: 0 auto;
      width: 40%;
      text-align: center;
      display: flex;
      justify-content: space-between;
      gap: 40px;
    }
    li {
      a {
        color: white;
        display: block;
        width: 100%;
        height: 100%;
        transition: filter 0.3s, transform 0.3s !important;
        font-size: 20px;
        font-weight: 700;
        text-shadow: -1px -1px 0 var(--fifth-color), 1px -1px 0 var(--fifth-color), -1px 1px 0 var(--fifth-color),
          1px 1px 0 var(--fifth-color);

        &:hover {
          filter: brightness(120%) !important;
          color: #f8aa7d !important;
        }
        &:active {
          transform: scale(0.92) !important;
        }
      }
    }
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    .nyb-logo {
      width: 120px;
      transition: filter 0.3s, transform 0.3s;
      &:hover {
        filter: brightness(120%);
        transform: scale(0.92);
      }
    }
  }
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
      object-fit: cover;
      border-radius: 50%;
    }
    .user-dropdown {
      position: relative;
      cursor: pointer;
      .info-mate {
        display: flex;
        align-items: center;
        text-align: right;
        img {
          transition: filter 0.3s, transform 0.3s;
          &:hover {
            transform: scale(0.92);
            filter: brightness(107%);
          }
        }
        .welcome-mate {
          margin-right: 8px;
          width: 85px;
          p {
            font-size: 14px;
            margin: 10px 0;
          }
        }
      }
      .welcome-mate p:last-child {
        font-weight: 600;
      }
      .dropdown-content {
        position: absolute;
        bottom: -70px;
        right: 0;
        width: 120px;
        background-color: white;
        border: 1px solid var(--fifth-color);
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1;
        a,
        div {
          display: block;
          padding: 8px 10px;
          text-align: center;
          text-decoration: none;
          color: #333;
          &:hover {
            background-color: var(--sixth-color);
          }
        }
      }
    }
  }
`;

const ModalWrapper = styled.div.attrs<{ isopen: boolean }>((props) => ({
  style: {
    transform: props.isopen ? 'translateY(0)' : 'translateY(100%)'
  }
}))<{ isopen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const AlarmButton = styled(NotificationsIcon)`
  cursor: pointer;
  transition: filter 0.3s, transform 0.3s;
  &:hover {
    transform: rotate(-30deg);
`;
