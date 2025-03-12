import { useQuery } from "@tanstack/react-query";
import { fetchGear } from "../managers/GearManager";

export const useGear = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["gear"],
        queryFn: fetchGear
    });

    if (isLoading) {
        return null;
    }

    return data
};