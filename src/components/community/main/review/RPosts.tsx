// 라이브러리
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';
// 타입
import { FetchPost, PostType } from '../../../../types/types';
// api
import { getSearchPosts } from '../../../../api/post';
// 컴포넌트
import RNewPosts from './RNewPosts';
import RStorePosts from './RStorePosts';
import RPopularPosts from './RPopularPosts';
import CommentCount from '../CommentCount';
// mui
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Skeleton from '@mui/material/Skeleton'; // 스켈레톤 추가
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';

const RPosts = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const storeId: number = state?.storeId || 0; // state가 존재하지 않을 때 기본값으로 0 사용
  const [sortName, setSortName] = useState<string>('최신순');
  const toggleSortButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setSortName(name);
  };
  useEffect(() => {
    if (storeId !== 0) {
      setSortName('후기보러 가기');
    }
  }, [storeId]);

  // 검색 로직
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSortName('팝업스토어 검색');
    fetchNextPage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(inputValue);
      handleSearch();
      setInputValue('');
    }
  };

  const { pathname } = useLocation();
  const queryKey = pathname === '/review' ? 'reviews' : 'mates';
  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FetchPost>({
    queryKey: [`search${queryKey}`, pathname, keyword],
    queryFn: ({ pageParam }) => getSearchPosts(pageParam, keyword, pathname),
    // enabled: !keyword,
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때
      if (lastPage.page < lastPage.totalPages) {
        // 다음 페이지로 pageParam를 저장
        return lastPage.page + 1;
      }
      return null; // 마지막 페이지인 경우
    }
  });

  const selectPosts = useMemo(() => {
    return posts?.pages
      .map((data) => {
        return data.posts;
      })
      .flat();
  }, [posts]);

  // 언제 다음 페이지를 가져올 것
  const { ref } = useInView({
    threshold: 1, // 맨 아래에 교차될 때
    onChange: (inView: any) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 대표이미지
  const extractImageTags = (html: string) => {
    const imageTags = [];
    const pattern = /<img.*?src=["'](.*?)["'].*?>/g;
    let match;

    while ((match = pattern.exec(html)) !== null) {
      imageTags.push(match[1]);
    }

    return imageTags;
  };

  // 상세페이지로 넘어가기
  const naviDetail = (post: PostType) => {
    navigate(`/rdetail/${post.id}`);
  };

  if (isLoading) {
    // 로딩 중일 때 스켈레톤을 렌더링합니다.
    return (
      <PostContainer>
        {Array.from({ length: 5 }, (_, index) => (
          <PostBox key={index}>
            <div>
              <ImageBoxs>
                <Skeleton variant="rectangular" width="100%" height={190} animation="wave" />
              </ImageBoxs>
            </div>
            <ContentBox>
              <Between>
                <Between>
                  <RoomRoundedIcon /> &nbsp;
                  <Skeleton width="80%" animation="wave" />
                </Between>
                <Between>
                  <NotesRoundedIcon /> &nbsp;
                  <Skeleton width="50px" animation="wave" />
                </Between>
              </Between>
              &nbsp;
              <Skeleton width="80%" animation="wave" />
              <Skeleton width="95%" animation="wave" />
              <Between>
                <Skeleton width="60px" animation="wave" />
                <Skeleton width="80px" animation="wave" />
              </Between>
            </ContentBox>
          </PostBox>
        ))}
      </PostContainer>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <ButtonContainer>
        <Between>
          <ButtonBox>
            <Button name="최신순" onClick={toggleSortButton}>
              최신순
            </Button>
            <Button name="인기순" onClick={toggleSortButton}>
              인기순
            </Button>
          </ButtonBox>
          <div>
            <Search />
            <Input
              value={inputValue}
              onChange={onChangeInput}
              onKeyPress={handleKeyPress}
              placeholder="엔터로 팝업스토어를 검색해보세요!"
            />
          </div>
        </Between>
      </ButtonContainer>
      {sortName === '후기보러 가기' && <RStorePosts />}
      {sortName === '최신순' && <RNewPosts />}
      {sortName === '인기순' && <RPopularPosts />}
      <PostContainer>
        {sortName === '팝업스토어 검색' &&
          selectPosts &&
          selectPosts.length > 0 &&
          selectPosts?.map((post) => {
            const imageTags = extractImageTags(post.body);
            const postText = post.body.replace(/<img.*?>/g, '');
            return (
              <PostBox key={post.id}>
                {imageTags.length > 0 ? (
                  <div>
                    <ImageBox src={imageTags[0]} />
                  </div>
                ) : (
                  <div>
                    <ImageBox src="/asset/defaultImg.png" alt="Default Image" width={250} height={140} />
                  </div>
                )}
                <ContentBox>
                  <Between>
                    <Between>
                      <RoomRoundedIcon /> &nbsp;
                      <Store>{post.store.title}</Store>
                    </Between>
                    <Between>
                      <NotesRoundedIcon /> &nbsp;
                      <CommentCount postId={post.id} />
                    </Between>
                  </Between>
                  &nbsp;<Title>{post.title}</Title>
                  <Body dangerouslySetInnerHTML={{ __html: postText }} />
                  <Between>
                    <Date>{moment(post?.created_at).format('YYYY.MM.DD HH:mm')}</Date>
                    <DetailButton onClick={() => naviDetail(post)}>상세보기</DetailButton>
                  </Between>
                </ContentBox>
              </PostBox>
            );
          })}
        {sortName === '팝업스토어 검색' && selectPosts && selectPosts.length === 0 && (
          <NoResult>아직 작성된 후기가 없습니다 :(</NoResult>
        )}
        <Trigger ref={ref} />
      </PostContainer>
    </>
  );
};

export default RPosts;

const ButtonContainer = styled.div`
  width: 870px;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.button`
  width: 80px;
  font-size: 14px;
  margin: 2px;
  background-color: var(--second-color);
`;

const Input = styled.input`
  width: 200px;
  height: 33px;
  padding: 0 20px 0 40px;
  outline: none;
  border-radius: 18px;
  border: 3px solid var(--fifth-color);
`;

const Search = styled(SearchRoundedIcon)`
  position: absolute;
  margin: 8px 10px 0 10px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const PostBox = styled.div`
  width: 870px;
  height: 200px;
  background-color: #fff;
  border: 3px solid var(--fifth-color);
  border-radius: 18px;
  padding: 10px;
  margin: 10px;
  display: flex;

  // box-sizing: border-box;

  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    border: 6px solid var(--primary-color);
  }
  &:active {
    background-color: rgb(215, 215, 219);
    transform: scale(0.98);
  }
`;

const ContentBox = styled.div`
  width: 515px;
  padding: 10px 20px;
`;

const ImageBox = styled.img`
  width: 310px;
  height: 190px;
  border: 2px solid var(--fifth-color);
  border-radius: 10px;
  margin: 5px 0 5px 3px;
  object-fit: cover;
`;

const Store = styled.div`
  font-weight: 600;
  padding: 15px 0;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(to top, var(--third-color) 50%, transparent 50%);
`;

const Body = styled.div`
  height: 65px;
  width: 420px;
  color: black;
  font-size: 14px;
  line-height: 1.5;
  max-height: 85px;
  padding: 10px 0 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 표시할 줄 수 설정 */
  -webkit-box-orient: vertical; /* 텍스트의 방향 설정 */
`;

const Date = styled.div`
  margin: 0 0 0 5px;
  font-size: 14px;
  font-weight: 400;
`;

const DetailButton = styled.button`
  width: 80px;
  font-size: 14px;
`;

const Trigger = styled.div`
  width: 100%;
  align-items: center;
`;

const NoResult = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 24px;
  font-weight: 700px;
`;

// 스켈레톤
const ImageBoxs = styled.div`
  width: 310px;
  height: 190px;
  border: 2px solid var(--fifth-color);
  border-radius: 10px;
  margin: 5px 0 5px 3px;
  object-fit: cover;
`;
