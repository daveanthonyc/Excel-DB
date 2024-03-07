import { useEffect, useState } from "react";
import { getData } from "./services/api-calls";
import PieChart from "./components/PieChat";
import "./App.css";
import {CircularProgress, Box, Typography, Toolbar, AppBar, Avatar, Stack, getToolbarUtilityClass } from "@mui/material"

function App() {

    type Data = {
        "id": string,
        "label": string,
        "value": number,
        "color": string
    }

    const [data, setData] = useState<Array<Data> | null>(null)
    const [offlinePercent, setOfflinePercent] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData();
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

    const adaptData = (data: Array): Data[]  => {
        const attendanceTimes = {
            "7am-Online": 0,
            "12pm-Online": 0,
            "7pm-Online": 0,
            "10pm-Online": 0,

            "7am-Offline": 0,
            "12pm-Offline": 0,
            "10pm-Offline": 0,
            "Missed": 0,
            "TBA": 0
        }

        data.forEach((row) => {
            attendanceTimes[row[1]]++;
        })

        const transformedArray = Object.entries(attendanceTimes).map(([key, value]) => (
            {
                "id": key,
                "label": key,
                "value": value,
                "color": "red"
            } as Data
        )).filter((entry) => entry.value !== 0);

        return transformedArray;
    }

  return (
    <div>
        <AppBar>
            <Toolbar>
                <Stack display='flex' width='100%' flexDirection='row' justifyContent='space-between'>
                    <Typography variant="h5">Special Department Dashboard</Typography>
                    <Avatar>DC</Avatar>
                </Stack>
            </Toolbar>
        </AppBar>
      <h1>Google Sheets Data - O2</h1>

        <div style={{display: 'flex', justifyContent: 'space-between', gap: '30px', width: '1080px'}}>
            <Box sx={{
                width: '100%',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.3)',
                borderRadius: '15px',
                padding: '50px'
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
  );
}

export default App;
