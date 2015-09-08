{{-- resources/views/index/index.blade.php --}}


    <div id="masthead">
        <div class="container">
            <div class="row">
                <div class="col-sm-7">
                    <h1>Bootstrap <p class="lead"><span style="color:#CCFF33;">Blog</span> Themes and Templates</p></h1>
                </div>
                <div class="col-sm-5">
                <!-- ad space -->
                    <div class="pull-right well well-lg">
                        <div id="carbonads-container">
                            <div class="carbonad">
                                <div id="azcarbon">
                                    <h2>Ads</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /cont -->
    </div>

    <div class="container" id="main" ng-controller="IndexController" ng-init="init()">
        <div class="row">
            <div class="col-sm-9 col-md-9 col-lg-9">
	    		<article class="row" ng-repeat="post in posts">
                    <br />
                    <div class="col-md-2 col-sm-3 text-center">
                        <a ng-href="author/@{{post.user.id}}"><img class="img-circle" ng-src="@{{post.user.image}}" style="width:100px;height:100px"></a>
                    </div>
                    <div class="col-md-10 col-sm-9">
                        <h3><a ng-href="p/@{{post.slug}}-@{{post.id}}" ng-attr-title="post.name" ng-bind="post.name"></a></h3>
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <p ng-bind="post.description"></p>
                                <p class="pull-right">
                                    <i class="fa fa-tags"></i>
									<a ng-repeat="tag in post.tags" ng-href="tag/@{{tag.slug}}-@{{tag.id}}" class="label tag" ng-bind="tag.name"></a>
                                </p>
                                <ul class="list-inline">
                                    <li><i class="fa fa-clock-o"></i><small ng-bind="post.due_date"></small></li>
                                    <li><a ng-href="p/@{{post.slug}}-@{{post.id}}#comment"><i class="fa fa-comments"></i> 11 <small>comment</small></a></li>
                                </ul>
                            </div>
                        </div>
                        <br>
                    </div>
                </article>
			</div>
            <div class="col-sm-3 col-md-3 col-lg-3">


            </div>
		</div>

    </div>
