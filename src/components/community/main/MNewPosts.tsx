import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { FetchPost } from '../../../types/types';
import { getPosts } from '../../../api/post';

import { styled } from 'styled-components';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import shortid from 'shortid';
import { ImSpinner } from 'react-icons/im';

const MNewPosts = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';

  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery<FetchPost>({
    queryKey: [`${queryKey}`, pathname],
    queryFn: ({ pageParam }) => getPosts(pageParam, storeId, pathname),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
      return null; // 마지막 페이지인 경우
    }
  });

  useEffect(() => {
    refetch();
  }, [storeId]);

  const selectPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);
  console.log(selectPosts);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 상세페이지로 넘어가기
  const naviDetail = (post: any) => {
    navigate(`/mdetail/${post.id}`);
  };

  // 프로필로 넘어가기
  const naviProfile = (userId: string) => {
    // navigate(`/yourpage/${userId}`);
    navigate(`/yourpage/${shortid.generate()}`, { state: { userId: userId } });
  };

  if (isLoading) {
    return (
      <div>
        <ImSpinner />
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <PostContainer>
        {selectPosts?.map((post) => {
          const postText = post.body.replace(/<img.*?>/g, '');
          return (
            <PostBox key={post.id}>
              <ContentBox>
                <Between>
                  <Between>
                    <RoomRoundedIcon /> &nbsp;
                    <Store>{post.store.title}</Store>
                  </Between>
                  <Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</Date>
                </Between>
                &nbsp;<Title>{post.title}</Title>
                <Between>
                  <Body dangerouslySetInnerHTML={{ __html: postText }} />
                  <Button onClick={() => naviDetail(post)}>상세보기</Button>
                </Between>
              </ContentBox>
              <ProfileBox>
                <Between>
                  <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.user.avatar_url}`} alt="User Avatar" />
                  <div>
                    <Name style={{ marginBottom: '5px', display: 'flex', flexDirection: 'column' }}>
                      <button />
                      <NameLine>{post.user.name}</NameLine>
                    </Name>
                    <Name>님과 함께 하기</Name>
                  </div>
                </Between>
                <ProfileButton onClick={() => naviProfile(post.user.id)}>프로필</ProfileButton>
              </ProfileBox>
            </PostBox>
          );
        })}
        <Trigger ref={ref} />
      </PostContainer>
    </>
  );
};

export default MNewPosts;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 870px;
  height: 160px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;
`;

const ContentBox = styled.div`
  width: 590px;
  padding: 10px 25px 10px 20px;
  border-right: 2px dashed var(--fifth-color);
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Store = styled.div`
  font-weight: 600;
  padding: 10px 0;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Body = styled.div`
  height: 45px;
  width: 430px;
  color: black;
  font-size: 14px;
  line-height: 1.5;
  padding: 15px 0 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

const Date = styled.div`
  margin: 0 0 0 5px;
  font-size: 14px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 80px;
  font-size: 14px;
  margin-top: 45px;
`;

const ProfileBox = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0 25px;
  position: relative;
  button {
    position: absolute;
    // margin-bottom: 20px;
    bottom: 34px;
    left: 54px;
    background-color: var(--fourth-color);
    width: 50px;
    height: 20px;

    cursor: default;
    &:hover {
      filter: brightness(100%);
    }
    &:active {
      transform: scale(1);
    }
  }
`;

const NameLine = styled.span`
  padding: 2px;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 10px 0 10px 20px;
  object-fit: cover;
  border-radius: 50%;
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;

const ProfileButton = styled.button`
  width: 80px;
  font-size: 14px;
  margin: 13px 0 0 150px;
`;
