# Table of Contents- [Dashboard](#Dashboard)- [Back-end](#Back-end)- [Deploy](#Deploy)- [Reference: Link](#Reference: Link)- [Reference: Short code](#Reference: Short code)- [Issue](#Issue)---## Dashboard- [X] PDF report- [X] Block client role visit other users- [X] Show transaction table for user only- [X] Show balance (JS: interest by dynamic calc)- [X] Show (interest) Points balance- [ ] Show withdraw [ interest Points ] [ date ] [ Entry ]  - [ ] Update calc to avoide sum withdraw items## Back-end- [X] Create new transaction with detail- [X] Add new_time & new_credit from aJax success callback- [X] Edit history transaction with [ date ] [ remark ] [ points ]- [ ] Point withdraw: record [ interest ] & [ date ]  * checked = calc result from last input (ref my JS)    - `adjust` block add interest checkbox handle    - add new withdraw perfix field (DB/PHP):      * Date      * Point with interest      * Entry    - Calc date between last transaction date    - Insert record### Minor task  - [ ] Dashboard - Style amount by JS## Deployment Remark* Deploy to staging server (lowb.me)* Deploy to production server* Ignore DB plug-in in WP* Prepare migrate .sql (not use in this time)* Rename table from [ mycred_log ] to [ myCRED_log ] !!!## Reference: Link* [Short Codes](http://codex.mycred.me/category/shortcodes/)* [Another WP plug-in](http://codecanyon.net/item/wpdeposit/500402)## Reference: Short code```[mycred_my_balance][mycred_exchange][mycred_give]```---## Issue### Back-end- Click user history not with filter ( result: show all users with pager )## Referror_log()