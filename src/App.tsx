import { useEffect, useState } from "react";
import { getData } from "./services/api-calls";
import PieChart,{ Data } from "./components/PieChat";
import "./App.css";
import {CircularProgress, Box, Typography, Toolbar, AppBar, Avatar, Stack } from "@mui/material"

function App() {

    const [data, setData] = useState<Array<Data> | null>(null)
    const [offlinePercent, setOfflinePercent] = useState<number | null>(null);

    type FetchedData<T> = Array<T>;

    useEffect(() => {
        const fetchData = async () => {
            const res: FetchedData<string> = await getData();
            if (res) {
                const adaptedData = adaptData(res);
                console.log(adaptedData)
                setData(adaptedData);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (data !== null) {
            setOfflinePercent(getOfflinePercentageFromAttendanceTimes(data));
        }
    }, [data])

    const getOfflinePercentageFromAttendanceTimes = (adaptedData: Data[]): number => {
        // for each object entry, if (key includes Offline), count ++
        // for each object entry if key inlcudes online count ++
        //
        const totalOfflineAttendees = adaptedData.filter((object) => {
            return object.id.toString().includes('Offline')
        }).reduce((prev, curr) => {
            return Number(prev) + Number(curr.value);
        }, 0);

        const totalAttendees = adaptedData.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0)

        return Math.round(totalOfflineAttendees / totalAttendees * 100);
    }

    const adaptData = (data: FetchedData<string>): Data[]  => {
        const attendanceTimes = {
            "7am-Online": {value: 0, color: "#CBFEC0"},
            "12pm-Online": {value: 0, color: "#99FF89"},
            "7pm-Online": {value: 0, color: "#5DDB6C"},
            "10pm-Online": {value: 0, color: "#276B37"},

            "7am-Offline": {value: 0, color: "#FADE61"},
            "12pm-Offline": {value: 0, color: "#FACB61"},
            "10pm-Offline": {value: 0, color: "#FAB861"},
            "Missed": {value: 0, color: "#FB6762"},
            "TBA": {value: 0, color: "#D6DFF7"}
        }

        type AttendanceTime = keyof typeof attendanceTimes;

        data.forEach((row) => {
            attendanceTimes[row[1] as AttendanceTime].value++;
        })

        const transformedArray = Object.entries(attendanceTimes).map(([key, value]) => (
            {
                "id": key,
                "label": key,
                "value": value.value,
                "color": value.color,
            } as Data
        )).filter((entry) => entry.value !== 0);

        return transformedArray;
    }

  return (
    <div style={{width: '100%'}}>
        <AppBar>
            <Toolbar>
                <Stack display='flex' width='100%' flexDirection='row' justifyContent='space-between'>
                    <Typography variant="h5">Special Department Dashboard</Typography>
                    <Avatar>DC</Avatar>
                </Stack>
            </Toolbar>
        </AppBar>

        <div className="container">
      <h1>Google Sheets Data - O2</h1>

            <div className="flex-container">
                <Box sx={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid rgba(0,0,0,0.3)',
                    borderRadius: '15px',
                    padding: '20px'
                }}>
                    <h2>Wed Attendance</h2>
                    {
                        (data !== null) ? <PieChart data={data} /> : <CircularProgress size={'10rem'} />
                    }
                </Box>

                <Box display='flex' gap='30px'>
                    <Box sx={{
                        width: '100%',
                        height: '400px',
                        border: '1px solid rgba(0,0,0,0.3)',
                        borderRadius: '15px',
                        padding: '50px'
                    }}>
                        <h2>Offline Attendance (%)</h2>
                        <Box sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        <Typography variant="h1">
                            {
                                (data !== null) ? `${offlinePercent}%` : <CircularProgress size={'5rem'} />
                            }
                        </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    </div>
  );
}

export default App;
