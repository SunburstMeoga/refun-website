(function ($) {
    "use strict";

    // Web3.js 库加载
    $.getScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js", function () {
        // 初始化Web3
        if (typeof window.ethereum !== 'undefined') {
            var web3 = new Web3(window.ethereum);
        } else {
            console.error("No Ethereum browser extension detected.");
        }

        // 检查钱包连接状态
        checkWalletConnection();

        function checkWalletConnection() {
            web3.eth.getAccounts().then(function (accounts) {
                if (accounts.length > 0) {
                    const account = accounts[0];
                    // 显示连接的钱包地址在按钮上
                    updateWalletButton(account);
                } else {
                    // 钱包未连接，显示"连接钱包"按钮
                    updateWalletButton(null);
                }
            }).catch(function (error) {
                console.error("Error checking wallet connection:", error);
            });
        }

        // 连接钱包函数
        $('#wallet-connect').click(async function () {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                // 显示连接的钱包地址在按钮上
                updateWalletButton(account);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        });

        // 更新按钮文本，显示钱包地址或"连接钱包"
        function updateWalletButton(account) {
            if (account) {
                const displayAddress = account.slice(0, 6) + "..." + account.slice(-4);
                $('#wallet-connect').text(displayAddress);
            } else {
                $('#wallet-connect').text("Connect Wallet");
            }
        }
    });

    // 其他已有代码...
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    });
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Project and Testimonial carousel
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    $("#header").load("/components/header.html");
    $("#footer").load("/components/footer.html");

})(jQuery);
