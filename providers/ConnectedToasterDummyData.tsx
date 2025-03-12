import type { ConnectedToaster } from "@/types/types"

// Dummy data for testing
export const dummyToasters: ConnectedToaster[] = [
  {
    toasterId: "1",
    toasterName: "Kitchen Toaster",
    pictureUrl: "https://picsum.photos/200",
    style: "blue",
    isActive: true,
    lastUsed: "2 hours ago",
    totalToastsSent: 156,
    deviceId: "BT-001",
    connectedUsers: [
      {
        userId: "1",
        username: "John",
        pictureUrl: "https://picsum.photos/200",
      },
      {
        userId: "2",
        username: "Sarah",
        pictureUrl: "https://picsum.photos/201",
      },
      {
        userId: "3",
        username: "Mike",
        pictureUrl: "https://picsum.photos/202",
      },
    ],
  },
  {
    toasterId: "2",
    toasterName: "Office Toaster",
    pictureUrl: "https://picsum.photos/201",
    style: "purple",
    isActive: false,
    lastUsed: "2 days ago",
    totalToastsSent: 89,
    connectedUsers: [
      {
        userId: "4",
        username: "Emma",
        pictureUrl: "https://picsum.photos/203",
      },
      {
        userId: "5",
        username: "James",
        pictureUrl: "https://picsum.photos/204",
      },
      {
        userId: "6",
        username: "Lisa",
        pictureUrl: "https://picsum.photos/205",
      },
      {
        userId: "7",
        username: "Tom",
        pictureUrl: "https://picsum.photos/206",
      },
      {
        userId: "8",
        username: "Anna",
        pictureUrl: "https://picsum.photos/207",
      },
    ],
  },
]
