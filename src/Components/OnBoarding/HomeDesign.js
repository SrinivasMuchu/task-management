import React from 'react'

function HomeDesign() {
  return (
    <>
      <div className='home-page' style={{marginTop:'8%'}}>
        <div className='home-page-left'>
          <span className='home-page-left-text1'>heading</span>
          <span className='home-page-left-text2'>It is a long established fact that a reader will be distracted by the readable content of
            a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
            as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
            still in their infancy.
            Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</span>
        </div>
        <div className='home-page-right'>

          <img src='https://img.freepik.com/premium-photo/developers-team-planning-weekly-schedule-tasks-task-board-teamwork-collaboration-vector-flat-concept-task-scheme-whiteboard-taskboard-schedule-strategy-illustration_977617-129800.jpg?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt='img' />
          <div className='home-page-right-btn'>
            <button>button</button>
          </div>
        </div>
      </div>

      <div className='created-by'>
        <div className='created-by-top'>
          <span>Done by</span>

        </div>
        <div className='created-by-bottom'>
          <div>
            <span>Karishma</span>
          </div>
          <div className='created-by-bottom-line'>

          </div>
          <div>
            <span>Srinivas</span>
          </div>
        </div>

      </div>
    </>

  )
}

export default HomeDesign