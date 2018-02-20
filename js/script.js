/*
    globals $, media, TweenMax
*/

let list;

let index = 0;

let amountElements = 5;

let $player = $('#player');

let $range = $('#rangeVolume');

let arrSignal = [];

const audioSvg = `
    <h1 class="play-text">play</h1>
    <h1 class="pause-text">pause</h1>
    <div class="active-box" onclick="playAudio()"></div>
    <svg onclick="pauseAudio()" id="audioContainer" style="margin-top: 80px;" viewBox="0 0 250 250">
        <g>
            <g>
                <path class="st1" d="M72.5,38.6c0-0.1,0.1-0.1,0.1-0.2c0.1-0.1,0.1-0.2,0.2-0.2c0.1-0.1,0.2-0.1,0.3-0.2c0.1,0,0.2-0.1,0.3-0.1
                                                h4.6c0.2,0,0.4,0.1,0.5,0.2c0.1,0.1,0.3,0.2,0.3,0.3l0.5,1l9.5,24.4c0.1,0.2,0.1,0.4-0.1,0.6c-0.1,0.2-0.4,0.2-0.7,0.2h-5.2
                                                c-0.3,0-0.5-0.1-0.6-0.2c-0.2-0.1-0.3-0.3-0.4-0.5c-0.2-0.6-0.5-1.2-0.7-1.8c-0.2-0.6-0.5-1.2-0.7-1.8H71
                                                c-0.2,0.6-0.5,1.2-0.7,1.8c-0.2,0.6-0.5,1.2-0.7,1.8c-0.2,0.4-0.5,0.7-0.9,0.7h-5.3c-0.2,0-0.4-0.1-0.6-0.2
                                                c-0.2-0.1-0.2-0.3-0.1-0.5L72.5,38.6z M75.8,46.3c-0.2,0.6-0.5,1.3-0.7,2c-0.2,0.7-0.5,1.4-0.7,2.1c-0.2,0.7-0.5,1.4-0.7,2.1
                                                c-0.2,0.7-0.5,1.4-0.7,2h5.5L75.8,46.3z" />
                <path class="st1" d="M99.3,54c0,0.9,0.1,1.6,0.4,2.3c0.2,0.6,0.6,1.1,1,1.5c0.4,0.4,0.9,0.7,1.4,0.9s1.1,0.3,1.7,0.3
                                                c0.6,0,1.2-0.1,1.7-0.3c0.5-0.2,1-0.5,1.4-0.9c0.4-0.4,0.7-0.9,1-1.5s0.4-1.3,0.4-2.1V38.7c0-0.2,0.1-0.4,0.2-0.6
                                                c0.1-0.2,0.4-0.2,0.6-0.2h5.3c0.3,0,0.5,0.1,0.6,0.2c0.2,0.2,0.2,0.3,0.2,0.5v15.2c0,2.1-0.3,3.9-0.9,5.3
                                                c-0.6,1.4-1.4,2.6-2.5,3.4c-1,0.9-2.3,1.5-3.6,1.9s-2.8,0.6-4.3,0.6c-1.5,0-3-0.2-4.3-0.6c-1.4-0.4-2.6-1-3.6-1.9
                                                c-1-0.9-1.9-2-2.5-3.5c-0.6-1.4-0.9-3.2-0.9-5.2V38.7c0-0.2,0.1-0.4,0.2-0.5c0.1-0.2,0.3-0.2,0.5-0.2h5.4c0.2,0,0.4,0.1,0.6,0.2
                                                c0.2,0.2,0.3,0.3,0.3,0.6V54z" />
                <path class="st1" d="M143.5,51.3c0,1.3-0.2,2.5-0.5,3.6c-0.3,1.1-0.8,2.2-1.4,3.2c-0.6,1-1.3,1.9-2.2,2.7
                                                c-0.8,0.8-1.8,1.5-2.8,2.1c-1,0.6-2.1,1-3.3,1.3c-1.2,0.3-2.4,0.5-3.7,0.5h-8.9c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.3-0.3-0.3-0.6
                                                V38.7c0-0.3,0.1-0.5,0.2-0.6c0.1-0.2,0.3-0.2,0.6-0.2h8.9c1.3,0,2.5,0.2,3.6,0.5s2.3,0.8,3.3,1.3c1,0.6,1.9,1.3,2.8,2.1
                                                c0.8,0.8,1.6,1.7,2.2,2.7c0.6,1,1.1,2.1,1.4,3.2S143.5,50,143.5,51.3z M127,44.3v13.8h1.5c0.3,0,0.5,0,0.8,0c0.3,0,0.5,0,0.8-0.1
                                                c0.9-0.1,1.7-0.3,2.5-0.7s1.5-0.8,2-1.4c0.6-0.6,1-1.3,1.4-2.1c0.3-0.8,0.5-1.7,0.5-2.6c0-1-0.2-1.9-0.6-2.8
                                                c-0.4-0.8-0.9-1.6-1.5-2.2c-0.6-0.6-1.4-1.1-2.3-1.4c-0.9-0.3-1.8-0.5-2.8-0.5H127z"
                />
                <path class="st1" d="M148.2,38.7c0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.3-0.2,0.6-0.2h5.3c0.2,0,0.4,0.1,0.6,0.2s0.3,0.3,0.3,0.6v25.1
                                                c0,0.5-0.3,0.8-0.9,0.8H149c-0.5,0-0.8-0.3-0.8-0.8V38.7z" />
                <path class="st1" d="M159.8,51.3c0-1.3,0.2-2.5,0.5-3.7s0.8-2.3,1.4-3.3s1.3-2,2.2-2.8c0.8-0.8,1.8-1.6,2.8-2.2
                                                c1-0.6,2.1-1.1,3.3-1.4s2.4-0.5,3.7-0.5c1.3,0,2.5,0.2,3.7,0.5s2.3,0.8,3.3,1.4c1,0.6,2,1.3,2.8,2.2c0.8,0.8,1.6,1.8,2.2,2.8
                                                c0.6,1,1.1,2.1,1.4,3.3s0.5,2.4,0.5,3.7s-0.2,2.5-0.5,3.7c-0.3,1.2-0.8,2.3-1.4,3.3c-0.6,1-1.3,1.9-2.2,2.8
                                                c-0.8,0.8-1.8,1.6-2.8,2.2c-1,0.6-2.1,1.1-3.3,1.4c-1.2,0.3-2.4,0.5-3.7,0.5c-1.3,0-2.5-0.2-3.7-0.5c-1.2-0.3-2.3-0.8-3.3-1.4
                                                c-1-0.6-1.9-1.3-2.8-2.2s-1.6-1.8-2.2-2.8s-1.1-2.1-1.4-3.3C159.9,53.8,159.8,52.5,159.8,51.3z M166.7,51.3c0,1,0.2,1.9,0.5,2.8
                                                c0.3,0.9,0.8,1.6,1.4,2.3c0.6,0.6,1.3,1.1,2.1,1.5c0.8,0.4,1.7,0.5,2.7,0.5c1,0,1.9-0.2,2.7-0.5s1.6-0.9,2.2-1.5
                                                c0.6-0.6,1.1-1.4,1.4-2.3c0.3-0.9,0.5-1.8,0.5-2.8c0-1-0.2-1.9-0.5-2.8c-0.3-0.9-0.8-1.6-1.4-2.3c-0.6-0.6-1.3-1.2-2.2-1.5
                                                s-1.7-0.6-2.7-0.6c-1,0-1.9,0.2-2.7,0.6c-0.8,0.4-1.5,0.9-2.1,1.5c-0.6,0.6-1.1,1.4-1.4,2.3C166.9,49.3,166.7,50.3,166.7,51.3z"
                />
            </g>
            <g>
                <g id="svg-audio">
                    <circle class="st5" cx="125.5" cy="154" r="66.3" />
                    <path class="st3" d="M64.3,179.5c5.1,12.2,13.7,22.6,24.6,29.8l36.6-55.2L64.3,179.5z" />
                    <polygon class="st3" points="181.4,118.5 170.8,106.4 125.5,154 			" />
                    <g>
                        <g id="hover-circle">
                            <circle class="st4" cx="125.5" cy="154" r="24.7" />
                        </g>

                        <g id="ripple-circle">
                            <circle class="st9" cx="125.5" cy="154" r="9.6" />
                            <circle class="st9" cx="125.5" cy="154" r="9.6" />
                            <circle class="st9" cx="125.5" cy="154" r="9.6" />
                        </g>
                        <circle class="st3" cx="125.5" cy="154" r="9.6" />
                    </g>
                </g>
                <path class="st2" d="M202.8,128.2H214c3.8,0,6.8-2.4,6.8-5.4V18.7c0-3-3.1-5.4-6.8-5.4H36c-3.8,0-6.8,2.4-6.8,5.4v104.1
                                                c0,3,3.1,5.4,6.8,5.4h13.1" />
                <path class="st7" d="M160,196.7l12.2,16.5c2.5,3.3,6.4,6.3,11.6,7.4" />
                <circle class="st8" cx="203.1" cy="224.6" r="9.9" />
                <g>
                    <g>
                        <circle class="st1" cx="189" cy="82.3" r="4.4" />
                        <circle class="st4" cx="189" cy="98.1" r="4.4" />
                    </g>
                </g>
                <path class="st4" d="M169.5,197.3c1.9,2.5,1.5,6-1,8l-2.2,1.7c-2.5,1.9-6,1.5-8-1l-7.3-9.4c-1.9-2.5-1.5-6,1-8l2.2-1.7
                                                c2.5-1.9,6-1.5,8,1L169.5,197.3z" />
                <path class="st8" d="M160,196.7l12.2,16.5c2.5,3.3,6.4,6.3,11.6,7.4c6.1,1.2,19.2,3.8,19.2,3.8" />
            </g>
            <g id="svg-line">
                <line class="st0" x1="162.7" y1="236.7" x2="87.3" y2="236.7" />
            </g>
        </g>
    </svg>`;

$(document).ready(function() {
    $('#subtitlesButton').hide();
    printList();
    list = $('.panel-block');
    setEventOverTheList();
    playFirstElement();
    togglePlayPause();
    setLoop();
    let event = new Event('input');
    $range.get(0).dispatchEvent(event);
});

/** */
function printList() {
    let $container = $('nav.panel');
    let html = '';
    for (let i = 0; i < media.length; i++) {
        const element = media[i];
        let typeIcon = 'reproductor-de-video';
        if (element.type == 'audio') {
            typeIcon = 'reproductor-de-musica';
        }
        html +=
            `<a id="${i}" class="panel-block" data-target="${element.sources}">
                <span class="panel-icon">
                    <svg>
                        <use xlink:href="#${typeIcon}"></use>
                    </svg>
                </span>
                ${element.name}
            </a>`;
    }
    $container.append($(html));
}

/** */
function playFirstElement() {
    let html = `<video id="elementMultimedia" 
        src="${media[index].sources[index]}" autoplay></video>`;
    $('#title').text(media[index].name);
    $(list[index]).addClass('is-active');
    $(list[index]).find('use').attr('xlink:href', '#spinner-player');
    $player.append($(html));
}

/** */
function setLoop() {
    $('#elementMultimedia').on('ended', function() {
        $('#svgAudioAnimation').empty();
        $('#subtitlesButton').hide();
        let typeIcon = '#reproductor-de-video';
        if (media[index].type == 'audio') {
            typeIcon = '#reproductor-de-musica';
        }
        $(list[index]).removeClass('is-active');
        $(list[index]).find('use').attr('xlink:href', typeIcon);

        if (index >= amountElements) {
            index = 0;
        } else {
            index++;
        }

        let audio = false;
        if (media[index].type == 'audio') {
            audio = true;
        }

        $('#title').text(media[index].name);
        $(list[index]).addClass('is-active');
        $(list[index]).find('use').attr('xlink:href', '#spinner-player');

        $(this).detach();

        if (audio) {
            $('#svgAudioAnimation').append(audioSvg);
        }
        let html = `<${media[index].type} id="elementMultimedia" autoplay>`;
        for (let i = 0; i < media[index].sources.length; i++) {
            if (media[index].name == 'Vídeo propio') {
                $('#subtitlesButton').show();
                html += `<source src="${media[index].sources[0]}">`;
                html += `<source src="${media[index].sources[1]}" media="(max-width: 727px)">`;
                break;
            } else {
                html += `<source src="${media[index].sources[i]}">`;
            }
        }
        if (media[index].name == 'Vídeo propio') {
            html += `<track label="Subtitles" kind="subtitles" srclang="es" src="assets/media/sub.vtt" default="">`;
        }
        html += `</${media[index].type}>`;

        $player.append($(html));
        animateAudio();
        setLoop();
        togglePlayPause();
    });
    $('#elementMultimedia').on('click', function() {
        let $element = $('#elementMultimedia')[0];
        if ($element.paused) {
            $element.play();
        } else {
            $element.pause();
        }
    });
}

/** */
function setEventOverTheList() {
    $(list).on('click', function() {
        $('#svgAudioAnimation').empty();
        $('#subtitlesButton').hide();
        let typeIcon = '#reproductor-de-video';
        if (media[index].type == 'audio') {
            typeIcon = '#reproductor-de-musica';
        }
        $(list[index]).removeClass('is-active');
        $(list[index]).find('use').attr('xlink:href', typeIcon);

        index = this.id;

        let audio = false;
        if (media[index].type == 'audio') {
            audio = true;
        }

        $('#title').text(media[index].name);
        $(list[index]).addClass('is-active');
        $(list[index]).find('use').attr('xlink:href', '#spinner-player');

        $('#elementMultimedia').detach();

        if (audio) {
            $('#svgAudioAnimation').append(audioSvg);
        }

        let html = `<${media[index].type} id="elementMultimedia" autoplay>`;
        for (let i = 0; i < media[index].sources.length; i++) {
            if (media[index].name == 'Vídeo propio') {
                $('#subtitlesButton').show();
                html += `<source src="${media[index].sources[0]}">`;
                html += `<source src="${media[index].sources[1]}" media="(max-width: 727px)">`;
                break;
            } else {
                html += `<source src="${media[index].sources[i]}">`;
            }
        }
        if (media[index].name == 'Vídeo propio') {
            html += `<track label="Subtitles" kind="subtitles" srclang="es" src="assets/media/sub.vtt" default="">`;
        }
        html += `</${media[index].type}>`;

        $player.append($(html));
        animateAudio();
        setLoop();
        togglePlayPause();
    });
}

/** */
function togglePlayPause() {
    $('#elementMultimedia').on('pause', function() {
        $('#playButton').find('use')
            .attr('xlink:href', '#music-player-play');
    });
    $('#elementMultimedia').on('play', function() {
        $('#playButton').find('use')
            .attr('xlink:href', '#music-player-pause-lines');
    });
}

$('#backwardButton').on('click', function() {
    $('#svgAudioAnimation').empty();
    $('#subtitlesButton').hide();
    let typeIcon = '#reproductor-de-video';
    if (media[index].type == 'audio') {
        typeIcon = '#reproductor-de-musica';
    }
    $(list[index]).removeClass('is-active');
    $(list[index]).find('use').attr('xlink:href', typeIcon);

    if (index == 0) {
        index = amountElements;
    } else {
        index--;
    }

    let audio = false;
    if (media[index].type == 'audio') {
        audio = true;
    }

    $('#title').text(media[index].name);
    $(list[index]).addClass('is-active');
    $(list[index]).find('use').attr('xlink:href', '#spinner-player');

    $('#elementMultimedia').detach();

    if (audio) {
        $('#svgAudioAnimation').append(audioSvg);
    }

    let html = `<${media[index].type} id="elementMultimedia" autoplay>`;
    for (let i = 0; i < media[index].sources.length; i++) {
        if (media[index].name == 'Vídeo propio') {
            $('#subtitlesButton').show();
            html += `<source src="${media[index].sources[0]}">`;
            html += `<source src="${media[index].sources[1]}" media="(max-width: 727px)">`;
            break;
        } else {
            html += `<source src="${media[index].sources[i]}">`;
        }
    }
    if (media[index].name == 'Vídeo propio') {
        html += `<track label="Subtitles" kind="subtitles" srclang="es" src="assets/media/sub.vtt" default="">`;
    }
    html += `</${media[index].type}>`;

    $player.append($(html));
    animateAudio();
    setLoop();
    togglePlayPause();
});

$('#playButton').on('click', function() {
    let $element = $('#elementMultimedia')[0];
    if ($element.paused) {
        $element.play();
    } else {
        $element.pause();
    }
});

$('#tenSecsButton').on('click', function() {
    $('#elementMultimedia')[0].currentTime += 10;
});

$('#forwardButton').on('click', function() {
    $('#svgAudioAnimation').empty();
    $('#subtitlesButton').hide();
    let typeIcon = '#reproductor-de-video';
    if (media[index].type == 'audio') {
        typeIcon = '#reproductor-de-musica';
    }
    $(list[index]).removeClass('is-active');
    $(list[index]).find('use').attr('xlink:href', typeIcon);

    if (index == amountElements) {
        index = 0;
    } else {
        index++;
    }

    let audio = false;
    if (media[index].type == 'audio') {
        audio = true;
    }

    $('#title').text(media[index].name);
    $(list[index]).addClass('is-active');
    $(list[index]).find('use').attr('xlink:href', '#spinner-player');

    $('#elementMultimedia').detach();

    if (audio) {
        $('#svgAudioAnimation').append(audioSvg);
    }

    let html = `<${media[index].type} id="elementMultimedia" autoplay>`;
    for (let i = 0; i < media[index].sources.length; i++) {
        if (media[index].name == 'Vídeo propio') {
            $('#subtitlesButton').show();
            html += `<source src="${media[index].sources[0]}">`;
            html += `<source src="${media[index].sources[1]}" media="(max-width: 727px)">`;
            break;
        } else {
            html += `<source src="${media[index].sources[i]}">`;
        }
    }
    if (media[index].name == 'Vídeo propio') {
        html += `<track label="Subtitles" kind="subtitles" srclang="es" src="assets/media/sub.vtt" default="">`;
    }
    html += `</${media[index].type}>`;

    $player.append($(html));
    animateAudio();
    setLoop();
    togglePlayPause();
});

$('#subtitlesButton').on('click', function() {
    if ($(this).hasClass('is-disabled')) {
        $(this).removeClass('is-disabled');
        $('#elementMultimedia').get(0).textTracks[0].mode = 'showing';
    } else {
        $(this).addClass('is-disabled');
        $('#elementMultimedia').get(0).textTracks[0].mode = 'disabled';
    }
});

$('#muteVolumeButton').on('click', function() {
    let element = $('#elementMultimedia').get(0);
    if (element.volume == 0) {
        element.volume = 1;
        for (let i = 4; i >= 0; i--) {
            $(`.volumeSignal:nth-child(${i})`).css('height', i * 10);
        }
    } else if (element.volume != 0) {
        element.volume = 0;
        for (let i = 1; i <= arrSignal.length; i++) {
            $(`.volumeSignal:nth-child(${i})`).css('height', '6px');
        }
    }
});

$('.volumeSignal').each(function() {
    arrSignal.push($(this));
});

$range.on('input', function() {
    let res = parseInt($range.val());
    // The first for controls the following divs
    for (let i = res + 1; i <= arrSignal.length; i++) {
        $(`.volumeSignal:nth-child(${i})`).css('height', '6px');
    }
    // This for controls the previous divs
    for (let i = res; i >= 0; i--) {
        $(`.volumeSignal:nth-child(${i})`).css('height', i * 10);
    }

    $('#elementMultimedia').get(0).volume = res / 4;
});

// #region
/** */
function animateAudio() {
    $('#audioContainer').hover(function() {
        hoverCircle = $(this).find('#hover-circle .st4');
        $(hoverCircle).css({
            'fill': '#7691BA',
        });
        TweenMax.to('.pause-text', 0.35, {
            autoAlpha: 1,
            y: -70,
            transformOrigin: '50% 50%',
            ease: Back.easeOut,
        });
    }, function() {
        $(hoverCircle).css({
            'fill': '#486CA3',
        });
        TweenMax.to('.pause-text', 0.35, {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
            ease: Back.easeIn,
        });
    });

    $('#audioContainer').click(function() {
        TweenMax.killTweensOf($(this).find('#svg-audio'));
        TweenMax.killTweensOf($(this).find('#ripple-circle circle'));
        TweenMax.set('#ripple-circle circle', {
            scale: 0.5,
            transformOrigin: '50% 50%',
        });
        let activeBox = $(this).prev();
        $(activeBox).show();
        TweenMax.set('.pause-text', {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
        });
        TweenMax.set('.play-text', {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
        });
    });

    $('.active-box').click(function() {
        $(this).hide();
        let spinDisc = $(this).next().find('#svg-audio');
        let rippleCircle = $(this).next().find('#ripple-circle circle');
        TweenMax.set(spinDisc, {
            rotation: 0,
            transformOrigin: '50% 50%',
        });
        TweenMax.to(spinDisc, 2, {
            rotation: 360,
            transformOrigin: '50% 50%',
            repeat: -1,
            ease: Linear.easeNone,
        });
        TweenMax.staggerTo(rippleCircle, 2.1, {
            scale: 20,
            transformOrigin: '50% 50%',
            autoAlpha: 0,
            repeat: -1,
            ease: Linear.easeNone,
        }, 0.7);
        TweenMax.set('.pause-text', {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
        });
        TweenMax.set('.play-text', {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
        });
    });

    $('.active-box').hover(function() {
        hoverCircle = $(this).parent().find('#hover-circle .st4');
        $(hoverCircle).css({
            'fill': '#7691BA',
        });
        TweenMax.to('.play-text', 0.35, {
            autoAlpha: 1,
            y: -70,
            transformOrigin: '50% 50%',
            ease: Back.easeOut,
        });
    }, function() {
        $(hoverCircle).css({
            'fill': '#486CA3',
        });
        TweenMax.to('.play-text', 0.35, {
            autoAlpha: 0,
            y: 0,
            transformOrigin: '50% 50%',
            ease: Back.easeIn,
        });
    });

    $('.circles').click(function() {
        TweenMax.to('.socialmedia-overlay', 1, {
            css: {
                'top': 0,
            },
            ease: Bounce.easeOut,
        });
        TweenMax.to('.fa-angle-up', 0.5, {
            autoAlpha: 1,
            ease: Power2.easeOut,
            delay: 1,
        });
        TweenMax.staggerFrom('.socialmedia-content div', 0.5, {
            scale: 0.1,
            transformOrigin: '50% 50%',
            autoAlpha: 0,
            ease: Back.easeOut,
            delay: 0.75,
        }, 0.5);
    });

    $('.fa-angle-up').click(function() {
        TweenMax.to('.socialmedia-overlay', 0.5, {
            css: {
                'top': '-100%',
            },
            ease: Power2.easeInOut,
        });
        TweenMax.to(this, 0.5, {
            autoAlpha: 0,
            ease: Power2.easeOut,
        });
    });
    $('#audioContainer').click();
    $('.active-box').click();
}

/** */
function playAudio() {
    $('#elementMultimedia')[0].play();
}

/** */
function pauseAudio() {
    $('#elementMultimedia')[0].pause();
}
// #endregion