export type VideoAsset = {
  id: string;
  status: string;
  output_video_url: string | null;
  lipsynced_video_url: string | null;
  transcription_file_url: string;
  audio_url: string;
};

export const videos: VideoAsset[] = [
    // {
    //   "id": "6934f05d-ba09-4f51-a738-cdd806fbc286",
    //   "status": "background_image_failed",
    //   "output_video_url": null,
    //   "lipsynced_video_url": null,
    //   "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/6934f05d-ba09-4f51-a738-cdd806fbc286/transcript_alignment.json",
    //   "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/6934f05d-ba09-4f51-a738-cdd806fbc286/audio.mp3"
    // },
    {
      "id": "5144dc15-a39f-496f-b9db-b63fd88ddf2b",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/5144dc15-a39f-496f-b9db-b63fd88ddf2b/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/5144dc15-a39f-496f-b9db-b63fd88ddf2b/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/5144dc15-a39f-496f-b9db-b63fd88ddf2b/audio.mp3"
    },
   
    {
      "id": "40117e60-2e7e-4951-b7c4-7ecda2d9178e",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/40117e60-2e7e-4951-b7c4-7ecda2d9178e/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/40117e60-2e7e-4951-b7c4-7ecda2d9178e/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/40117e60-2e7e-4951-b7c4-7ecda2d9178e/audio.mp3"
    },
    {
      "id": "0ec9ab24-9f82-4d27-a4be-4723f42064a3",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0ec9ab24-9f82-4d27-a4be-4723f42064a3/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0ec9ab24-9f82-4d27-a4be-4723f42064a3/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0ec9ab24-9f82-4d27-a4be-4723f42064a3/audio.mp3"
    },
    {
      "id": "e69cc1b3-297a-4e56-b256-4ee1b08753ac",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/e69cc1b3-297a-4e56-b256-4ee1b08753ac/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/e69cc1b3-297a-4e56-b256-4ee1b08753ac/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/e69cc1b3-297a-4e56-b256-4ee1b08753ac/audio.mp3"
    },
    {
      "id": "b5fbf249-0392-48e5-88f4-a760c62578f2",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/b5fbf249-0392-48e5-88f4-a760c62578f2/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/b5fbf249-0392-48e5-88f4-a760c62578f2/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/b5fbf249-0392-48e5-88f4-a760c62578f2/audio.mp3"
    },
    {
      "id": "8156a9ff-594a-43c6-9fba-fdf68ef90158",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/8156a9ff-594a-43c6-9fba-fdf68ef90158/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/8156a9ff-594a-43c6-9fba-fdf68ef90158/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/8156a9ff-594a-43c6-9fba-fdf68ef90158/audio.mp3"
    },
    {
      "id": "362c86fd-d294-4269-975c-8b2ffe5b788e",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/362c86fd-d294-4269-975c-8b2ffe5b788e/with_brolls/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/362c86fd-d294-4269-975c-8b2ffe5b788e/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/362c86fd-d294-4269-975c-8b2ffe5b788e/audio.mp3"
    },
    {
      "id": "095a6101-cdd5-4322-aa43-8ab22a172cce",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/095a6101-cdd5-4322-aa43-8ab22a172cce/with_brolls/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/095a6101-cdd5-4322-aa43-8ab22a172cce/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/095a6101-cdd5-4322-aa43-8ab22a172cce/audio.mp3"
    },
    {
      "id": "7d1e21af-dc94-4a9a-9991-a881ad0b89af",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7d1e21af-dc94-4a9a-9991-a881ad0b89af/with_brolls/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7d1e21af-dc94-4a9a-9991-a881ad0b89af/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7d1e21af-dc94-4a9a-9991-a881ad0b89af/audio.mp3"
    },
    {
      "id": "1f8c03e6-b760-403a-a484-6ce9741680d6",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/1f8c03e6-b760-403a-a484-6ce9741680d6/with_brolls/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/1f8c03e6-b760-403a-a484-6ce9741680d6/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/1f8c03e6-b760-403a-a484-6ce9741680d6/audio.mp3"
    },
    {
      "id": "abb2bc28-6579-47d6-a377-15df6af55884",
      "status": "stitching_failed",
      "output_video_url": null,
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/abb2bc28-6579-47d6-a377-15df6af55884/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/abb2bc28-6579-47d6-a377-15df6af55884/audio.mp3"
    },
  
    {
      "id": "3e1abf6b-0df4-4017-b38b-b475a0fd75b5",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/3e1abf6b-0df4-4017-b38b-b475a0fd75b5/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/3e1abf6b-0df4-4017-b38b-b475a0fd75b5/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/3e1abf6b-0df4-4017-b38b-b475a0fd75b5/audio.mp3"
    },
    {
      "id": "56f78fe3-090b-46dd-8a3a-fc7ee3a0ef64",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/56f78fe3-090b-46dd-8a3a-fc7ee3a0ef64/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/56f78fe3-090b-46dd-8a3a-fc7ee3a0ef64/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/56f78fe3-090b-46dd-8a3a-fc7ee3a0ef64/audio.mp3"
    },
   
    {
      "id": "92d4f5f9-ef25-4008-b57b-2d4afc1cd0d0",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/92d4f5f9-ef25-4008-b57b-2d4afc1cd0d0/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/92d4f5f9-ef25-4008-b57b-2d4afc1cd0d0/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/92d4f5f9-ef25-4008-b57b-2d4afc1cd0d0/audio.mp3"
    },
    {
      "id": "0b24faf0-74f3-46ef-b41b-a5adb69f1dce",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0b24faf0-74f3-46ef-b41b-a5adb69f1dce/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0b24faf0-74f3-46ef-b41b-a5adb69f1dce/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/0b24faf0-74f3-46ef-b41b-a5adb69f1dce/audio.mp3"
    },
    {
      "id": "eb2467b6-9abe-44eb-9e5a-d59cab16dc19",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/eb2467b6-9abe-44eb-9e5a-d59cab16dc19/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/eb2467b6-9abe-44eb-9e5a-d59cab16dc19/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/eb2467b6-9abe-44eb-9e5a-d59cab16dc19/audio.mp3"
    },
    {
      "id": "46b04060-f2d8-4b87-a7b9-20a41d342c96",
      "status": "storyboard_failed",
      "output_video_url": null,
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/46b04060-f2d8-4b87-a7b9-20a41d342c96/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/46b04060-f2d8-4b87-a7b9-20a41d342c96/audio.mp3"
    },
    {
      "id": "7238ac93-8488-41d3-8e30-d4c3adec4206",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7238ac93-8488-41d3-8e30-d4c3adec4206/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7238ac93-8488-41d3-8e30-d4c3adec4206/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/7238ac93-8488-41d3-8e30-d4c3adec4206/audio.mp3"
    },
    {
      "id": "dca512ad-d1eb-4159-8754-8809d95eab4e",
      "status": "completed",
      "output_video_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/dca512ad-d1eb-4159-8754-8809d95eab4e/avatar_only/final_output.mp4",
      "lipsynced_video_url": null,
      "transcription_file_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/dca512ad-d1eb-4159-8754-8809d95eab4e/transcript_alignment.json",
      "audio_url": "https://assets-tessact.s3.ap-south-1.amazonaws.com/ai_avatars/537ecabf-e3f0-4390-9465-7101b13e8a1e/dca512ad-d1eb-4159-8754-8809d95eab4e/audio.mp3"
    }
  ];

const REMOTION_DEMO_VIDEO_ID = "5144dc15-a39f-496f-b9db-b63fd88ddf2b";

/** Completed avatar render with `output_video_url` + transcript (used by Remotion). */
export const remotionDemoVideo: VideoAsset = videos.find(
  (v) => v.id === REMOTION_DEMO_VIDEO_ID,
)!;