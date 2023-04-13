import styled from "styled-components";

export default function Header() {
    const Root = styled.div`
    height: 100vh;`

    const HeaderContent = styled.div`
        width: 100%;
        max-width: 1800;
        background: rgb(250,255,73);
        background: linear-gradient(90deg, rgba(250,255,73,1) 0%, rgba(255,196,85,1) 100%);`

    const Header = styled.div`
    margin: 0px 100px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;`

    const Tabs = styled.div`
    display: flex;
    gap: 50px;`

    const Tab = styled.div`
    font-size: 20px;`

    return (
        <Root>
            <HeaderContent>
                <Header>
                    <Tabs>
                        <Tab>TEST1</Tab>
                        <Tab>TEST1</Tab>
                        <Tab>TEST1</Tab>
                    </Tabs>
                </Header>
            </HeaderContent>
        </Root>
    )
}