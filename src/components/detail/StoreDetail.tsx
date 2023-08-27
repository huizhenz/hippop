import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Store } from '../../types/types';
import { fetchDetailData } from '../../api/store';

import Share from './Share';
import Calendar from './Calendar';
import BookMark from './BookMark';
import StoreMap from './StoreMap';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: storeData,
    isLoading,
    isError
  } = useQuery<Store | null>({ queryKey: ['detailData', Number(id)], queryFn: () => fetchDetailData(Number(id)) });

  const handleopenlink = () => {
    const linkUrl = `${storeData?.link}`;
    window.open(linkUrl, '_blank');
  };

  if (isError) {
    return <div>데이터를 가져오는 도중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>데이터를 로딩 중입니다.</div>;
  }

  return (
    <div>
      {storeData && (
        <>
          <div>제목 : {storeData.title}</div>
          <div>내용 : {storeData.body}</div>
          <div>지역: {storeData.location}</div>
          <div>운영시간 : {storeData.opening}</div>
          <div>
            기간 : {storeData.period_start} ~ {storeData.period_end}
          </div>
          <div>
            <LinkBtn
              onClick={() => {
                handleopenlink();
              }}
            >
              🔗 {storeData.link}
            </LinkBtn>
          </div>
          <div>
            <Share />
          </div>
          <div>
            <BookMark storeData={storeData} />
          </div>
          <ImgBox>
            {storeData.images.map((image, index) => (
              <div key={index}>
                <Img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${image}`} alt={`Image ${index}`} />
              </div>
            ))}
          </ImgBox>
          <Calendar storeData={storeData} />
          <StoreMap storeLocation={storeData.location} title={storeData.title} />
        </>
      )}
    </div>
  );
};

export default StoreDetail;

const ImgBox = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const LinkBtn = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
`;
