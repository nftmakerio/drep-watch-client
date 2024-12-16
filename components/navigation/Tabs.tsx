import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

export function NavigationTabs() {
  return (
    <Tabs defaultValue="questions" className="w-full">
      <TabsList>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
        <TabsTrigger value="dreps">Dreps</TabsTrigger>
      </TabsList>
      
      <TabsContent value="questions">
        {/* Questions content */}
      </TabsContent>
      
      <TabsContent value="answers">
        {/* Answers content */}
      </TabsContent>
      
      <TabsContent value="dreps">
        {/* Dreps content */}
      </TabsContent>
    </Tabs>
  )
} 