import axios from "axios";

export const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
        const response = await axios.put(`/tasks/${taskId}/status`, {
            status: newStatus,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update task status", error);
        throw error;
    }
};
