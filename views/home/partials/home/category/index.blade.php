{{-- resources/views/category/index.blade.php --}}

@extends(config('core.default_layout'))

@section('content')
    <div id="masthead">
        <div class="container">
            <div class="row">
                <div class="col-md-7">
                    <h1>{!! trans('labels.category') !!}: {!! $category->name !!}</h1>
                    <p class="lead">QSoft Vietnam workable product</p>
                </div>
                <div class="col-md-5">
                    <!-- ad space -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="well pull-right">
                                <div id="carbonads-container">
                                    <div class="carbonad">
                                        <div id="azcarbon">
                                            <p class="lead">Ads</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /cont -->
    </div>
    <div class="container" id="main">
        <div class="row">
            <div class="col-sm-9 col-md-9 col-lg-9">
                @forelse($posts as $post)
                    <article class="row">
                        <br />
                        <div class="col-md-2 col-sm-3 text-center">
                            <a href="{!! route('author.index', [str_slug($post->user->name), $post->user->id]) !!}"><img src="{!! $post->user->image or config('core.no_image') !!}" style="width:100px;height:100px" class="img-circle"></a>
                        </div>
                        <div class="col-md-10 col-sm-9">
                            <h3><a href="{!! route('post.view', [$post->slug, $post->id]) !!}" title="{!! $post->name !!}">{!! $post->name !!}</a></h3>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <p>{!! $post->description !!}</p>
                                    <p class="pull-right">
                                        @forelse($post->tags as $tag)
                                            <a href="{!! route('tag.index', [$tag->slug, $tag->id]) !!}" class="label tag">{!! $tag->name !!}</a>
                                        @empty
                                        @endforelse
                                    </p>
                                    <ul class="list-inline">
                                        <li>{!! FA::icon('clock-o') !!} <small>{!! $post->due_date !!}</small></li>
                                        <li><a href="{!! route('post.view', [$post->slug, $post->id]) !!}#comment">{!! FA::icon('comments') !!} <small>{!! $post->comments()->count() !!} Comments</small></a></li>
                                    </ul>
                                </div>
                            </div>
                            <br>
                        </div>
                    </article>
                @empty
                @endforelse
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3">
                @include('partials.box-category')
                @include('partials.box-tag')
            </div>
        </div>
        {!! $posts->render() !!}
    </div>
@endsection
