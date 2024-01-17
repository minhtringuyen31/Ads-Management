# Advertising Panel Management Application

**Authors**: [Tri Nguyen](https://github.com/minhtringuyen31), [Thanh Bui](https://github.com/buiquangthanhcode), [Thien Thai](https://github.com/thienhk15), [Duong Pham](https://github.com/ThaiDuong2002), [Thao Nguyen](https://github.com/thaomin69)

## Introduction

![AdsManagement](https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337224/see9wkvos6nrdbleanty.png)  
This is an application designed to streamline and enhance the management of advertising boards throughout City X. This platform caters to the needs of residents, local officials at the ward and district levels, as well as the Department of Culture and Sports, providing a transparent and efficient system for overseeing the city's advertising landscape.

### For Residents

![Residents](https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337224/o6a45u8vjmajohfml47k.png)  
The app features a user-friendly homepage with an interactive map showcasing approved advertising locations in City X. Residents can easily access detailed information about these locations, including addresses, zones, types of locations, advertising formats, and images of advertising boards. Additionally, users can view specific details about each advertising board, such as type, size, images, and contract expiration dates. Residents also have the capability to report any issues related to advertising boards or specific locations on the map.

### For Ward and District Officials

Local officials can efficiently manage information about advertising locations and boards within their respective areas. They can also review reports submitted by residents and promptly address them. The app facilitates requests for editing information and advertising permits.

### For Department of Culture and Sports Officials:

![Residents](https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337224/uj5nwlz9azqp7aor7p9p.png)  
Officials at the department level have comprehensive control over the entire system, including lists of districts, wards, types of advertising, and advertising locations. They can access statistics on reports and their processing status from lower levels. Account creation and area assignment for management purposes are easily administered.

## Installation

### Resident Application (React + Vite)

Explore folder `Client/citizens-app`  
Install packages `npm install`  
Runs the app in the development mode `npm start`  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Officials Application (React + CRA)

Explore folder `Client/officer-app`  
Install packages `npm install`  
Runs the app in the development mode `npm run dev`  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Mail Service & Server Application

Explore folder `MailService` `Server`  
Install packages `npm install`  
Runs the app in the development mode `npm start`  
MailService run in [http://localhost:5002](http://localhost:5002)  
Server run in [http://localhost:5002](http://localhost:5001)  
In addition, it is also posible to explore [https://webadvance.sofware](https://webadvance.sofware) || [Swagger UI](https://webadvance.software/api-docs/)

## What You're Getting

**Client/citizens-app**

```bash
Client
    └── citizens-app
        ├── .gitignore
        ├── .eslintrc.cjs
        ├── README.md
        ├── index.html
        ├── vite.config.js
        ├── package.json
        ├── public
        │   └── vite.svg
        └── src
            ├── .env
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── assets
            ├── axiosConfig
            │   └── axiosClient.js
            ├── provider
            ├── mockData
            └── ui-component
                ├── AdsInformation
                │   ├── AdsItem.jsx
                │   └── AdsList.jsx
                ├── Drawer
                │   └── Drawer.jsx
                ├── LocationInfomation
                │   └── LocationInformation.jsx
                ├── MapContainer
                │   ├── Map.jsx
                │   └── style.css
                ├── Modal
                │   ├── AdsDetailModal.jsx
                │   ├── NoticeDetailModal.jsx
                │   └── ReportModal.jsx
                ├── Notification
                │   ├── NotificationItem.jsx
                │   └── NotificationList.jsx
                ├── Report
                │   ├── ReportForm.jsx
                │   ├── ReprotItem.jsx
                │   └── ReportList.jsx
                └── Search
                    └── SearchBar.jsx
```

**Client/officer-app**

```bash
Client
    └── officer-app
        ├── .gitignore
        ├── README.md
        ├── jsconfig.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── manifest.json
        │   └── robots.txt
        └── src
            ├── App.css
            ├── App.js
            ├── index.css
            ├── index.js
            ├── assets
            ├── axiosConfig
            │   └── axios-config.js
            ├── layout
            │   ├── AuthenLayout
            │   │   └── AuthenLayout.jsx
            │   └── MainLayout
            │       ├── Header
            │       ├── Sidebar
            │       └── MainLayout.jsx
            │
            ├── menu-items
            │   ├── dashboard.js
            │   ├── utilities.js
            │   ├── page.js
            │   └── index.js
            ├── redux
            │   ├── auth
            │   │   ├── authenticate-slice.js
            │   │   └── authorization-slide.js
            │   └── index.js
            ├── routes
            │   ├── AuthenticationRoutes.jsx
            │   ├── MainRoutes.jsx
            │   └── index.jsx
            ├── socket
            │   └── SocketProvider.jsx
            ├── store
            │   ├── auth
            │   ├── dashboard
            │   ├── report-map
            │   └── report
            └── views
                ├── dashboard
                ├── errors
                ├── pages/authentication
                └── utilities
                    ├── statistic
                    │   ├── ApprovedReport.jsx
                    │   ├── BarChart.jsx
                    │   ├── NotYetApprovedReport.jsx
                    │   ├── ReportResolution.jsx
                    │   ├── ReportStatistic.jsx
                    │   └── TotalReport.jsx
                    ├── account
                    │   ├── AccountManagement.jsx
                    │   ├── AssignRole.jsx
                    │   ├── CreateAccount.jsx
                    │   └── DetailAccount.jsx
                    ├── authorize_request
                    │   ├── AuthorizeRequestList.jsx
                    │   └── AuthorizeRequesDetail.jsx
                    ├── categories
                    │   ├── Map.jsx
                    │   └── style.css
                    ├── district-manage
                    │   ├── AdsDetailModal.jsx
                    │   ├── NoticeDetailModal.jsx
                    │   └── ReportModal.jsx
                    ├── list-license-adsboard
                    │   ├── NotificationItem.jsx
                    │   └── NotificationList.jsx
                    ├── list-location-adsboard
                    │   ├── ReportForm.jsx
                    │   ├── ReprotItem.jsx
                    │   └── ReportList.jsx
                    ├── profile
                    │   ├── ReportForm.jsx
                    │   ├── ReprotItem.jsx
                    │   └── ReportList.jsx
                    └── report-manage
                        ├── ReportForm.jsx
                        ├── ReprotItem.jsx
                        └── ReportList.jsx
```
**Server**

```base
Server
    ├── .gitignore
    ├── Dockerfile
    ├── index.js
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    │── helper
    │   ├── dto.js
    │   ├── errorHandler.js
    │   └── filter.js
    │── public
    │   ├── log.css
    │   ├── log.html
    │   └── log.js
    │── messae-broker
    │   ├── consumer.js
    │   ├── publisher.js
    │   └── rabbitmq.js
    │── controllers
    │   ├── adsboard.controller.js
    │   ├── adsboardtype.controller.js
    │   ├── adstype.controller.js
    │   ├── auth.controller.js
    │   ├── authorizeRequest.controller.js
    │   ├── company.controller.js
    │   ├── district.controller.js
    │   ├── editRequest.controller.js
    │   ├── location.controller.js
    │   ├── locationType.controller.js
    │   ├── notification.controller.js
    │   ├── report.controller.js
    │   ├── reportType.controller.js
    │   ├── user.controller.js
    │   └── ward.js
    │── middlewares
    │   ├── authenticate.js
    │   ├── authorize.js
    │   └── uploader.js
    │── models
    │   ├── AdsBoardModel.js
    │   ├── AuthorizeRequestModel.js
    │   ├── CompanyModel.js
    │   ├── DistrictModel.js
    │   ├── EditRequest.js
    │   ├── LocationModel.js
    │   ├── NotificationModel.js
    │   ├── RefreshTokenModel.js
    │   ├── ReportModel.js
    │   ├── TypeModel.js
    │   ├── UserModel.js
    │   └── WardModel.js
    │── routes
    │── services
    │── socket
    │   └── socket.js
    │── utils
    │   ├── hash.js
    │   ├── jwtUtils.js
    │   ├── logger.js
    │   ├── sendEmail.js
    │   ├── socket.js
    │   └── utils.js
    └── validators
        ├── adsBorad.validator.js
        ├── location.validator.js
        ├── repot.validator.js
        └── user.validator.js
```

**MailService**

```base
MailService
    ├── .gitignore
    ├── index.js
    ├── package.json
    ├── sendMail.js
    └── messae-broker
        ├── consumer.js
        ├── publisher.js
        └── rabbitmq.js
```

### API

[API Docs](https://webadvance.software/api-docs/)

### Acknowledge
