{{-- resources/views/post/show.blade.php --}}
<div ng-controller="PostController" ng-init="findPost()">

	<div id="masthead">
        <div class="container">
            <div class="row">
                <div class="col-md-7">
                	<a ng-href="author/@{{post.user.id}}"><img ng-src="post.user.image" class="img-circle" width="200px"></a>
                	<p class="lead"><i class="fa fa-anchor"></i> Author: @{{post.user.name}}</p>
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
				<h1 ng-bind="post.name"></h1>
				<p><i class="fa fa-user"></i> <a ng-href="author/@{{post.user.id}}" ng-bind="post.user.name"></a> | <i class="fa fa-clock-o"></i> @{{post.created_at}}</p>
				<div class="content">
					<div ng-bind-html="post.content"></div>

					<h4><i class="fa fa-tags"></i> Tag:
						<a class="label label-default" ng-repeat="tag in post.tags" ng-bind="tag.name" href="tag/@{{tag.slug}}-@{{tag.id}}"></a>
					</h4>

					<h4>Category:
						<a class="label label-default" ng-repeat="category in post.categories" ng-bind="category.name" href="categpry/@{{categpry.slug}}"></a>
					</h4>
				</div>
				<div class="panel panel-default box" id="comment">
				  	<div class="panel-heading">
						<h3 class="panel-title">
							Comment
						</h3>
				  	</div>
				  	<div class="box-body">
						<div class="comment">
							<form>
								<div class="row">
									<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
										<textarea rows="2" ng-model="comment" class="form-control"></textarea>
						  			</div>
							  		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
							  			<button class="btn btn-primary pull-right">Comment</button>
									</div>
					  			</div>
					  		</form>

							<div class="media" ng-repeat="comment in post.comments">
								<a class="pull-left" href="#">
									<img ng-src="comment.user.image" width="80px" class="img-circle">
								</a>
								<div class="media-body">
									<small><em><strong ng-bind="comment.user.name"></strong> say:</em></small>
									<div class="well well-sm">
										<p ng-bind="comment.content"></p>
									</div>
									<small><i class="fa fa-clock-o"></i> @{{comment.updated_at}}</small>
								</div>
							</div>
				  		</div>
				  	</div>
				</div>
			</div>
			<div class="col-sm-3 col-md-3 col-lg-3">

			</div>
		</div>

	</div>
</div>