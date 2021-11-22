import React from 'react';

function Alert({success, message}) {
    if (success) {
        return (
            <div>

                <div class="container p-4">
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <div class="alert alert-success alert-dismissible fade show align-items-center" role="alert">
                                <div>
                                    { success }
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    } if (message) {
        <div class="container p-4">
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <div class="alert alert-danger alert-dismissible fade show align-items-center" role="alert">
                        <div>
                            { message }
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default Alert;