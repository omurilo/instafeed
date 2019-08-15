import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import LazyImage from '../../components/LazyImage';
import {
  AuthorImage, AuthorName, Description, Header, Loading, Post,
} from './styles';

const Feed = () => {
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [changedItems, setChangedItems] = useState([]);

  async function handleLoad(pageNumber = page, shouldRefresh) {
    if (total && total < pageNumber) return;

    setIsLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setList(shouldRefresh ? data : [...list, ...data]);
    setPage(pageNumber + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    handleLoad();
  }, []);

  function renderItem(item) {
    return (
      <Post>
        <Header>
          <AuthorImage source={{ uri: item.author.avatar }} />
          <AuthorName>{item.author.name}</AuthorName>
        </Header>
        <LazyImage
          shouldLoad={changedItems.includes(item.id)}
          source={{ uri: item.image }}
          ratio={item.aspectRatio}
          smallSource={{ uri: item.small }}
        />
        <Description>
          <AuthorName>{item.author.name}</AuthorName>
          {' '}
          {item.description}
        </Description>
      </Post>
    );
  }

  async function refreshList() {
    setRefreshing(true);

    await handleLoad(1, true);

    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setChangedItems(changed.map(({ item }) => item.id));
  }, []);

  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={() => handleLoad()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20, minimumViewTime: 500 }}
        ListFooterComponent={isloading && <Loading />}
      />
    </View>
  );
};

export default Feed;
