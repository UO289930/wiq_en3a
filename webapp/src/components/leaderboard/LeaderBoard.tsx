import React from "react"
import RankingTable from "./RankingTable"
import TrivialRankingTable from "./TrivialRankingTable"
import { TabList, Tab, TabPanels, TabPanel, Tabs } from "@chakra-ui/react"


export default function LeaderBoard() {



    return (
        <>
            <h1 className="h1-leaderboard"> LEADERBOARD </h1>
            
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <TrivialRankingTable />
            

        </>
        //<RankingTable />

        /*
        <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>*/
    )
}