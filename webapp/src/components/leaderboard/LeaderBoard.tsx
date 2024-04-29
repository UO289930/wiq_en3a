import React, { useState } from "react"
import RankingTable from "./RankingTable"
import TrivialRankingTable from "./TrivialRankingTable"
import { TabList, Tab, TabPanels, TabPanel, Tabs } from "@chakra-ui/react"
 

export default function LeaderBoard() {

    const tabs = ["NORMAL", "TRIVIAL"];
    const [selectedIndex, setSelectedIndex] = useState(0);


    return (
        <>
            <h1 id="leaderboardHeader" className="h1-leaderboard"> LEADERBOARD </h1>
            
            <Tabs isFitted className="chakra-tabs-container">
                <TabList className="chakra-tabs" mb='1em'>
                    {
                        tabs.map((tab, index) => {
                            return(
                                <Tab 
                                    onClick={() => setSelectedIndex(index)}
                                    key={index} 
                                    className={index === selectedIndex ? "chakra-tabs-tab-selected" : "chakra-tabs-tab"}>
                                        {tab}
                                </Tab>
                            )
                        })
                    }
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <RankingTable />
                    </TabPanel>
                    <TabPanel>
                        <TrivialRankingTable />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}