import { Loader } from '@/components/Loader';
import { useQuery } from 'convex/react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/notifications.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { format, formatDistanceToNow } from 'date-fns';

/**
 * The Notifications screen displays a list of all the notifications a user has
 * received. If the user has no notifications, it displays a message saying so.
 * Otherwise, it displays a list of all the notifications, with each
 * notification showing the sender's avatar, name, and a short message. Tapping
 * on a notification takes the user to the post or comment that the
 * notification is about.
 */

export default function Notifications() {
  const notifications = useQuery(api.notifications.getnotifications);

  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponentStyle={styles.listContainer}
      />
    </View>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/notifications`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification?.sender?.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification?.type === 'like' ? (
                <Ionicons name="heart" size={16} color="red" />
              ) : notification?.type === 'follow' ? (
                <Ionicons name="person-add" size={16} color="#8B5CF6" />
              ) : (
                <Ionicons
                  name="chatbubble-ellipses"
                  size={16}
                  color="#3B82F6"
                />
              )}
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link href={`/notifications`} asChild>
          <TouchableOpacity>
            <Text style={styles.username}>{notification.sender.username}</Text>

          </TouchableOpacity>
          </Link>
              <Text style={styles.action}>
                {notification.type === 'like'
                  ? 'liked your post'
                  : notification.type === 'follow'
                  ? 'started following you'
                  : 'commented on your post'}

              </Text>
              <Text style={styles.timeAgo}>
                {formatDistanceToNow(notification._creationTime, {
                  addSuffix: true,
                })}
                </Text>
      </View>
    </View>
    {
notification.post  && (
  <Image
  source={notification.post.imageurl}
  style={styles.postImage}
  contentFit="cover"
  transition={200}

  />
)  }
    </View>
  );
}

function NoNotificationsFound() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Ionicons
        name="notifications-outline"
        size={48}
        color={COLORS.primary}
      />
      <Text style={{ fontSize: 20, color: 'white' }}>
        No Notifications Found
      </Text>
    </View>
  );
}
