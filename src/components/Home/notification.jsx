import useSWR from "swr";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../../lib/hooks/useAxios";
import { Check } from "@mui/icons-material";

const NotificationList = () => {
  const api = useAxios();

  const { data, error, isLoading, mutate } = useSWR("/user/notifications");

  const markAsRead = async (id) => {
    try {
      await api.post(`/user/notifications/${id}/mark-read/`);
      mutate();
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/user/notifications/${id}/delete/`);
      mutate();
    } catch (err) {
      console.error("Error deleting notification", err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading notifications.</div>;

  return (
    <List>
      {data.length === 0 && (
        <Typography variant="body2" color="textSecondary" className="px-4 py-2">
          No notifications.
        </Typography>
      )}
      {data.map((notification) => (
        <ListItem key={notification.id}>
          <ListItemText
            primary={
              <Typography fontWeight={notification.is_read ? "normal" : "bold"}>
                {notification.message}
              </Typography>
            }
            secondary={new Date(notification.created_at).toLocaleString()}
          />
          <IconButton
            onClick={() => markAsRead(notification.id)}
            disabled={notification.is_read}
          >
            <Check color={notification.is_read ? "gray" : "success"} />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification(notification.id);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
