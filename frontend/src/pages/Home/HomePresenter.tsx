import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPostsList } from '../../api/api';
import FeedCard from '../../components/feature/Home/FeedCard';
import HomeAside from '../../components/feature/Home/HomeAside';
import StoryBox from '../../components/feature/Home/StoryBox';
import BottomNavigationBar from '../../components/layout/NavigationBar/BottomNavigationBar';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bgColor};
  padding-top: 60px;
  @media ${({ theme }) => theme.tablet} {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media ${({ theme }) => theme.mobile} {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MainWrapper = styled.main`
  width: 848px;
  height: fit-content;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${({ theme }) => theme.tablet} {
    width: 80vw;
    align-items: center;
    justify-content: center;
  }
  @media ${({ theme }) => theme.mobile} {
    width: 100vw;
    align-items: center;
    justify-content: center;
  }
`;

const StoryAndFeedSection = styled.section`
  width: 470px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 14px 0;
  @media ${({ theme }) => theme.tablet} {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${({ theme }) => theme.mobile} {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface HomePresenterType {
  data: any;
  refetchPage: any;
  scrollRef: any;
}

const HomePresenter = ({ data, refetchPage, scrollRef }: HomePresenterType) => {
  return (
    <>
      <NavigationBar />
      <MainContainer>
        <MainWrapper>
          <StoryAndFeedSection>
            <StoryBox />
            {data?.pages.flatMap((page: any, pageIndex: any) =>
              page.data.postList.map((post: any) => (
                <FeedCard
                  key={post.postId}
                  postId={post.postId}
                  username={post.username}
                  profileImage={post.profileImage}
                  likeYn={post.likeYn}
                  likeCount={post.likeCount}
                  createdAt={post.createdAt}
                  commentCount={post.commentCount}
                  bookmarkYn={post.bookmarkYn}
                  content={post.content}
                  postImageList={post.postImageList}
                  userId={post.userId}
                  refetchPage={refetchPage}
                  pageIndex={pageIndex}
                />
              )),
            )}
          </StoryAndFeedSection>
          <HomeAside />
        </MainWrapper>
      </MainContainer>
      <div
        style={{ background: 'black', width: '30px', height: '30px' }}
        ref={scrollRef}
      />
    </>
  );
};

export default HomePresenter;
