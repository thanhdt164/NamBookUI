<template>
    <div class="item-card-two">
        <div class="left">
            <div class="img">
                <img src="https://books.google.com/books/publisher/content/images/frontcover/MXCRDQAAQBAJ?fife=w160-h230" alt="">
            </div>
        </div>
        <div class="right">
            <div class="title">The Barefoot Investor: The Only Money Guide You'll Ever Need</div>
            <div class="author">John Wiley & Sons</div>
            <div class="summary">That's a bold claim, given there are already thousands of finance books on the shelves.
                So what makes this one different?
                Well, you won't be overwhelmed with a bunch of 'tips' ... or a strict budget (that youwon't follow).
                You'll get a step-by-step formula: open this account, then do this; call this person, and say this; invest money here, and not there. All with a glass of wine in your hand.
                This book will show you how to create an entire financial plan that is so simple you can sketch it on the back of a serviette ... and you'll be able to manage your money in 10 minutes a week.
            </div>
            <div class="bot">
                <div class="star col-4">abcd</div>
                <div class="flex">
                    <div class="price">₫806,698</div>
                    <div class="real-price">₫564,689</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-item-card-2',
}
</script>

<style scoped >
    .item-card-two{
        height: 160px;
        width: 100%;
        margin-bottom: 8px !important;
        border: 1px solid #D5D5D5;
        box-shadow: 1px 2px #D5D5D5;
        border-radius: 1px;
        background-color: #fff;
        display: flex;
        align-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #333333;
    }
    .left{
        width: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .left:hover{
        filter: grayscale(80%);
        cursor: pointer;
        background-color: #D5D5D5;
    }
    .img{
        width: 100%;
        height: auto;
        padding: 0 1px !important;
    }
    img{
        max-height: 160px;
        max-width: 100%;
    }
    .right{
        padding: 7px 10px;
        width: 220px;
        height: 100%;
    }
    .right .title{
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
       
    }
    .right .title:hover{
         text-decoration: underline;
         cursor: pointer;
    }
    .right .author{
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 9px !important;
    }
    .right .author:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .right .summary{
        width: 100%;
        height: 60px;
        font-size: 13px;
        overflow: hidden;
        text-align: left;
        margin-bottom: 12px !important;
        padding-right: 10px !important;
    }
    .bot{
        display: flex;
        align-items: center;
        height: 18px;
        font-size: 13px;
        justify-content: space-between;
    }
    .col-4, .col-8, .col-6{
        padding: 0;
    }
    .flex{
        display: flex;
    }
    .bot .star{
        
    }
    .price{
        text-align: right;
        color: #aaa;
        text-decoration-line: line-through;
        width: 60px;
        white-space: nowrap;
        overflow: hidden;
    }
    .real-price{
        width: 60px;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        color: #01579B;
    }
    .real-price:hover{
        text-decoration: underline;
        cursor: pointer;
    }
</style>